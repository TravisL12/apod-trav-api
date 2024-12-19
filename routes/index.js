var express = require("express");
const {
  fetchApod,
  formatDateString,
  fetchRandomApod,
} = require("../helpers/utils");
var router = express.Router();
const redisClient = require("../redisDb.js");
const { getDate } = require("../helpers/middleware.js");

router.get("/", getDate, async function (req, res, next) {
  try {
    const date = req.date;
    let data = await redisClient.get(formatDateString(date));
    data = data ? JSON.parse(data) : undefined;

    if (!data || !!data.error) {
      data = await fetchApod(date);

      if (data.error) {
        throw new Error(data.error);
      } else {
        redisClient.set(formatDateString(date), JSON.stringify(data));
      }
    } else {
      console.log(`Redis data ${date}`);
    }

    res.json(data);
  } catch (e) {
    console.log(e.message, "Date get error!");
    res.json({ msg: "not found!", error: e.message });
  }
});

router.get("/random", async function (req, res, next) {
  try {
    const { count } = req.query;
    const data = await fetchRandomApod(count);

    if (data.error) {
      throw new Error(data.error);
    }

    data.forEach(async (apod) => {
      const isCached = await redisClient.exists(formatDateString(apod.date));
      if (isCached) {
        console.log("Already cached", apod.date);
      } else {
        console.log("REDIS caching data", apod.date);
        redisClient.set(formatDateString(apod.date), JSON.stringify(apod));
      }
    });
    res.json(data);
  } catch (e) {
    console.log(e.message, "Random error!");
    res.json({ msg: "not found!", error: e.message });
  }
});

module.exports = router;
