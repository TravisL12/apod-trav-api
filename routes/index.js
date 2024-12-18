var express = require("express");
const { APOD_API_URL } = require("../helpers/constants");
var router = express.Router();

const API_KEY = process.env.APOD_API_KEY;

/* GET home page. */
router.get("/apod", async function (req, res, next) {
  const { date } = req.query;
  const url = new URL(APOD_API_URL);
  url.searchParams.append("api_key", API_KEY);
  url.searchParams.append("date", date);

  const apodReq = await fetch(url.toString());
  const data = await apodReq.json();

  console.log(data, "data");
  res.render("index", { title: "Express", description: data.explanation });
});

module.exports = router;
