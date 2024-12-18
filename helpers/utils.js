const { APOD_API_URL } = require("./constants");

const API_KEY = process.env.APOD_API_KEY;

/**
 *
 * @param {string} date
 * @returns {URL}
 */
const buildApodUrl = (date) => {
  const url = new URL(APOD_API_URL);
  url.searchParams.append("api_key", API_KEY);
  if (date) {
    url.searchParams.append("date", date);
  }

  return url;
};

/**
 *
 * @param {string} date
 * @returns {apodResponse}
 */
const fetchApod = async (date) => {
  const url = buildApodUrl(date);
  const apodReq = await fetch(url.toString());
  const data = await apodReq.json();
  data.apodLink = buildApodDirectLink(data.date);
  data.thumbnailLink = thumbSourceLink(data.date);

  return data;
};

/**
 *
 * @param {Date} date
 * @returns {string}
 */
const formatDateObj = (date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

/**
 *
 * @param {string} date
 * @returns {string}
 */
const formatDateString = (date) => {
  return formatDateObj(new Date(date));
};

/**
 *
 * @param {number} num
 * @returns {string}
 */
const zeroPad = (num) => {
  num = `0${num.toString()}`;
  return num.slice(-2);
};

// https://apod.nasa.gov/apod/ap220321.html (generate `220321`)
/**
 *
 * @param {string} dateString
 * @returns {string}
 */
const linkDateFormat = (dateString) => {
  const date = formatDateString(dateString);
  const [year, month, day] = date.split("-");
  return `${year.slice(-2)}${zeroPad(month)}${zeroPad(day)}`;
};

/**
 *
 * @param {string} date
 * @returns {string}
 */
const buildApodDirectLink = (date) => {
  return `https://apod.nasa.gov/apod/ap${linkDateFormat(date)}.html`;
};

// https://apod.nasa.gov/apod/calendar/S_011007.jpg
/**
 *
 * @param {string} date
 * @returns {string}
 */
const thumbSourceLink = (date) => {
  if (!date) return;
  return `https://apod.nasa.gov/apod/calendar/S_${linkDateFormat(date)}.jpg`;
};

module.exports = { buildApodUrl, fetchApod, formatDateString, formatDateObj };
