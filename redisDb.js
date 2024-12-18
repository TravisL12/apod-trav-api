const redis = require("redis");

const redisUrl = process.env.REDIS_URL;
const client = redis.createClient({
  url: redisUrl,
});

module.exports = client;
