const { ERROR_MESSAGE, ERROR_STATUS_CODE } = require("../utils/constant");

const validateEmployeeCreate = async (req, res, next) => {
  const { gender, phoneNumber, emailAddress, employeeName } = req.body;

  if (!gender || !phoneNumber || !emailAddress || !employeeName) {
    let error = new Error(ERROR_MESSAGE.ALL_FIELDS_REQUIRED);

    error.statusCode = ERROR_STATUS_CODE.BAD_REQUEST_400;
    next(error);
  } else {
    next();
  }
};

module.exports = { validateEmployeeCreate };
