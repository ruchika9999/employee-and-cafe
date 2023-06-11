const { ERROR_MESSAGE, ERROR_STATUS_CODE } = require("../utils/constant");

const errorHandler = async (err, req, res, next) => {
  const statusCode = err.statusCode ?? 500;

  switch (statusCode) {
    case ERROR_STATUS_CODE.BAD_REQUEST_400:
      return res.status(statusCode).json({
        title: ERROR_MESSAGE.BAD_REQUEST,
        message: err.message,
      });
    case ERROR_STATUS_CODE.NOT_FOUND_404:
      return res
        .status(statusCode)
        .json({ title: ERROR_MESSAGE.NOT_FOUND, message: err.message });
    case ERROR_STATUS_CODE.UNAUTHORIZED_401:
      return res.status(statusCode).json({
        title: ERROR_MESSAGE.UNAUTHORIZED,
        message: err.message,
      });
    case ERROR_STATUS_CODE.FORBIDDEN_403:
      return res
        .status(statusCode)
        .json({ title: ERROR_MESSAGE.FORBIDDEN, message: err.message });
    case ERROR_STATUS_CODE.SERVER_ERROR_500:
      return res
        .status(statusCode)
        .json({ title: ERROR_MESSAGE.SERVER_ERROR, message: err.message });
    default:
      console.log(ERROR_MESSAGE.DEFAULT, err);
      break;
  }
};

module.exports = { errorHandler };
