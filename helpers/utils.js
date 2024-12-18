const { APOD_API_URL } = require("./constants");

const API_KEY = process.env.APOD_API_KEY;

const buildApodUrl = (date) => {
  const url = new URL(APOD_API_URL);
  url.searchParams.append("api_key", API_KEY);
  if (date) {
    url.searchParams.append("date", date);
  }

  return url;
};

const fetchApod = async (date) => {
  const url = buildApodUrl(date);
  const apodReq = await fetch(url.toString());
  const data = await apodReq.json();
  return data;
};

module.exports = { buildApodUrl, fetchApod };
