const { buildWorkerFor } = require("./cacheWorkers");

function startWorkers() {
  const collections = ["users"];
  return collections.map(buildWorkerFor);
}

module.exports = { startWorkers };
