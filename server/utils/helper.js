const mongoose = require("mongoose");

const generateId = (uq) => {
  const objectId = new mongoose.Types.ObjectId();
  return `${uq}${objectId}`.toUpperCase();
};

const getToday = () =>
  new Intl.DateTimeFormat(["ban", "id"]).format(new Date());

const generateNumber = (min = 10, max = 99) => {
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
};

const throwError = (errorMessage, code, next) => {
  let error = new Error(errorMessage);
  error.statusCode = code;
  next(error);
};

module.exports = {
  generateId,
  getToday,
  generateNumber,
  throwError,
};
