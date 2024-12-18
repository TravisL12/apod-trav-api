var express = require("express");
const { fetchApod, formatDateString } = require("../helpers/utils");
var router = express.Router();
const redisClient = require("../redisDb.js");
const { getDate } = require("../helpers/middleware.js");

router.get("/apod", getDate, async function (req, res, next) {
  const date = req.date;
  let data = await redisClient.get(formatDateString(date));

  if (!data) {
    data = await fetchApod(date);
    redisClient.set(formatDateString(date), JSON.stringify(data));
  } else {
    console.log("REDIS data", date);
    data = JSON.parse(data);
  }

  res.json(data);
});

module.exports = router;
