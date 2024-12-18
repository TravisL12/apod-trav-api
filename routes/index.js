var express = require("express");
const { fetchApod } = require("../helpers/utils");
var router = express.Router();

/* GET home page. */
router.get("/apod", async function (req, res, next) {
  const data = await fetchApod(req.query.date);
  console.log(data, "data");

  res.render("index", {
    title: "Express",
    date: data.date,
    description: data.explanation,
  });
});

module.exports = router;
