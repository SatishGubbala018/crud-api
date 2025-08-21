const prefix = process.env.CACHE_PREFIX || "app:v1";

const userKey = (id) => `${prefix}:user:${id}`;

const listKey = (collection, fingerprint) =>
  `${prefix}:${collection}:list:${fingerprint}`;

module.exports = { userKey, listKey };
