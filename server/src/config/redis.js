const IORedis = require("ioredis");
require("dotenv").config();

const isTrue = (v) => String(v).toLowerCase() === "true";
console.log(
  "env. ............",
  process.env.REDIS_PORT,
  process.env.REDIS_PASSWORD,
  process.env.REDIS_HOST,
  process.env.REDIS_TLS
);
const baseOpts = {
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD,
  tls: isTrue(process.env.REDIS_TLS) ? {} : undefined,
  maxRetriesPerRequest: null, // important for BullMQ
  enableReadyCheck: true,
};

const redis = new IORedis(baseOpts);
const redisSubscriber = new IORedis(baseOpts); // optional pub/sub

const connection = new IORedis(baseOpts);

redis.on("error", (e) => console.error("[redis] error", e));
connection.on("error", (e) => console.error("[bullmq-conn] error", e));

module.exports = { redis, redisSubscriber, connection };

// import { createClient } from 'redis';

// const client = createClient({
//     username: 'default',
//     password: 'LVEWTWIUv7kXRpDtH4viOZm2tY0cD0lk',
//     socket: {
//         host: 'redis-12047.c114.us-east-1-4.ec2.redns.redis-cloud.com',
//         port: 12047
//     }
// });

// client.on('error', err => console.log('Redis Client Error', err));

// await client.connect();

// await client.set('foo', 'bar');
// const result = await client.get('foo');
// console.log(result)  // >>> bar
