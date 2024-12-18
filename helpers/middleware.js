const { formatDateObj } = require("./utils");

function getDate(req, res, next) {
  const { date } = req.query;
  req.date = date || formatDateObj(new Date());
  next();
}

module.exports = { getDate };
