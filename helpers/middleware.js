function getDate(req, res, next) {
  const { date } = req.query;
  req.date = date || formatDate(new Date());
  next();
}

module.exports = { getDate };
