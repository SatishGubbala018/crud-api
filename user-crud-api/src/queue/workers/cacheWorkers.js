const { Worker } = require("bullmq");
const { connection } = require("../../config/redis");
const { setJson, delKeys } = require("../../cache/cacheServices");
const { userKey } = require("../../cache/cacheKeys");
const { getDlqForCollection } = require("../registry");
const logger = require("../../utils/logger");

const concurrency = Number(process.env.QUEUE_CONCURRENCY || 8);

// Map collection -> cache handlers
const handlers = {
  users: {
    singleKey: ({ id }) => userKey(id),
    async apply(event) {
      const key = this.singleKey(event);
      if (event.operation === "delete") {
        await delKeys([key]);
        return;
      }
      // For create & update, cache the latest snapshot
      await setJson(key, event.doc);
      // Optional: invalidate list caches here if you maintain any
      // await invalidateUserLists();
    },
  },
};

function buildWorkerFor(collection) {
  const name = `${process.env.QUEUE_PREFIX || "appq"}-${collection}`;
  const dlq = getDlqForCollection(collection);

  const worker = new Worker(
    name,
    async (job) => {
      const event = job.data;
      const handler = handlers[collection];
      if (!handler) throw new Error(`No handler for collection ${collection}`);
      await handler.apply(event);
    },
    { connection, concurrency }
  );

  worker.on("failed", async (job, err) => {
    logger.error(`[worker:${collection}] job failed`, job?.id, err?.message);
    try {
      // Push to DLQ after last attempt
      if (job.attemptsMade >= job.opts.attempts) {
        await dlq.add("dead", job.data);
      }
    } catch (e) {
      logger.error(`[worker:${collection}] DLQ push failed`, e);
    }
  });
  worker.on("completed", (job) => {
    if (job.attemptsMade > 0) {
      logger.info(
        `[worker:${collection}] completed after attempts`,
        job.attemptsMade
      );
    }
  });
  return worker;
}

module.exports = { buildWorkerFor };
