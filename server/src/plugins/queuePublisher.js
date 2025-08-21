const { getQueueForCollection } = require("../queue/registry");
const logger = require("../utils/logger");

/**
 * Mongoose plugin to publish cache events per-collection.
 * Attaches to schema; derives collection name from model.collection.name
 */
module.exports = function queuePublisher(schema) {
  function publish(doc, operation, updatedFields) {
    try {
      const collection = doc.constructor.collection.name; // e.g., 'users'
      const queue = getQueueForCollection(collection);
      const payload = {
        operation,
        collection,
        id: String(doc._id),
        updatedFields: updatedFields || undefined,
        // Avoid huge payloads; include lean doc snapshot when reasonable
        doc:
          operation !== "delete"
            ? doc.toObject({ depopulate: true })
            : undefined,
        occurredAt: new Date().toISOString(),
      };
      return queue.add(operation, payload);
    } catch (e) {
      logger.error("queue publish error", e);
    }
  }

  // Create
  schema.post("save", function (doc) {
    publish(doc, "create");
  });

  // Update (findOneAndUpdate, updateOne, etc.)
  schema.post(["findOneAndUpdate", "updateOne"], async function (result) {
    if (!result) return; // may be write result; try fetch doc
    let doc = result;
    if (!doc._id && this.model && this.getQuery && this.getQuery()._id) {
      doc = await this.model.findById(this.getQuery()._id).lean(false);
      if (!doc) return;
    }
    const updatedFields = Object.keys(
      this.getUpdate ? this.getUpdate() || {} : {}
    );
    publish(doc, "update", updatedFields);
  });

  // Delete
  schema.post(
    ["findOneAndDelete", "findByIdAndDelete", "deleteOne"],
    async function (res) {
      const model = this.model || (this.constructor && this.constructor.model);
      const q = this.getQuery ? this.getQuery() : undefined;
      let docId;
      if (q && q._id) docId = String(q._id);
      else if (res && res._id) docId = String(res._id);

      if (!docId || !model) return;

      const fakeDoc = new model({ _id: docId });
      publish(fakeDoc, "delete");
    }
  );
};
