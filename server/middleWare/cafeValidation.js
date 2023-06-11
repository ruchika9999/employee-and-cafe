const { ERROR_MESSAGE, ERROR_STATUS_CODE } = require("../utils/constant");

const validateCafeCreate = (req, res, next) => {
  const { cafeName, description, location } = req.body;

  if (!cafeName || !description || !location) {
    let error = new Error(ERROR_MESSAGE.ALL_FIELDS_REQUIRED);

    error.statusCode = ERROR_STATUS_CODE.BAD_REQUEST_400;
    next(error);
  } else {
    next();
  }
};

module.exports = { validateCafeCreate };
