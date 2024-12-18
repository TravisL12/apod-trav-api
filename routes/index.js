var express = require("express");
const { fetchApod, formatDateString } = require("../helpers/utils");
var router = express.Router();
const redisClient = require("../redisDb.js");
const { getDate } = require("../helpers/middleware.js");

/* GET home page. */
router.get("/apod", getDate, async function (req, res, next) {
  const date = req.date;
  let data = await redisClient.get(formatDateString(date));

  if (!data) {
    data = await fetchApod(date);
    redisClient.set(formatDateString(date), JSON.stringify(data));
  } else {
    console.log("REDIS data");
    data = JSON.parse(data);
  }

  console.log(data, "data");

  res.render("index", {
    title: "Express",
    date: data.date,
    description: data.explanation,
  });
});

module.exports = router;
