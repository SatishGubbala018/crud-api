// Declare a dedicated queue per collection
const { buildQueue } = require("./factory");

// Add collections here
const collections = ["users"];

const registry = collections.reduce((acc, name) => {
  acc[name] = buildQueue(name);
  // Also create DLQ (dead-letter queue) per collection
  acc[`${name}Dlq`] = buildQueue(`${name}_dlq`);
  return acc;
}, {});

function getQueueForCollection(collection) {
  const entry = registry[collection];
  if (!entry)
    throw new Error(`No queue registered for collection: ${collection}`);
  return entry.queue;
}

function getDlqForCollection(collection) {
  const entry = registry[`${collection}Dlq`];
  if (!entry)
    throw new Error(`No DLQ registered for collection: ${collection}`);
  return entry.queue;
}

module.exports = { registry, getQueueForCollection, getDlqForCollection };

// // TypeScript-ish for clarity; actual JS payload conforms to this shape
// interface CacheEvent {
// operation: 'create' | 'update' | 'delete';
// collection: string; // e.g., 'users'
// id: string; // document _id
// updatedFields?: string[]; // optional for update
// doc?: any; // full doc snapshot for create/update if available
// occurredAt: string; // ISO timestamp
// }
