const { redis } = require("../config/redis");

const TTL = Number(process.env.CACHE_TTL_SECONDS || 3600);

async function setJson(key, value, ttlSeconds = TTL) {
  const payload = JSON.stringify(value);
  if (ttlSeconds > 0) {
    await redis.set(key, payload, "EX", ttlSeconds);
  } else {
    await redis.set(key, payload);
  }
}

async function getJson(key) {
  const v = await redis.get(key);
  return v ? JSON.parse(v) : null;
}

async function delKeys(keys = []) {
  if (!keys.length) return 0;
  return redis.del(keys);
}

/**
 * Read-through helper: fetch from cache else load via loader() and cache.
 */
async function getOrLoad(key, loader, ttlSeconds = TTL) {
  const cached = await getJson(key);
  if (cached) return cached;
  const fresh = await loader();
  if (fresh !== undefined && fresh !== null) {
    await setJson(key, fresh, ttlSeconds);
  }
  return fresh;
}

module.exports = { setJson, getJson, delKeys, getOrLoad };
