const { Queue, QueueEvents } = require("bullmq");
const { connection } = require("../config/redis");

const qPrefix = process.env.QUEUE_PREFIX || "appq";

function buildQueue(name) {
  const queueName = `${qPrefix}-${name}`;
  const queue = new Queue(queueName, {
    connection,
    defaultJobOptions: {
      attempts: Number(process.env.QUEUE_ATTEMPTS || 5),
      backoff: {
        type: "exponential",
        delay: Number(process.env.QUEUE_BACKOFF_MS || 2000),
      },
      removeOnComplete: 5000,
      removeOnFail: 5000,
    },
  });
  const events = new QueueEvents(queueName, { connection });
  return { queue, events, queueName };
}

module.exports = { buildQueue };
