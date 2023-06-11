const { Cafe } = require("../models/cafeModel");
const { validationResult } = require("express-validator");

const asyncHandler = require("express-async-handler");
const { throwError } = require("../utils/helper");
const {
  findAndUpdateCafe,
  addNumberOfEmployees,
  getUpdatedCafe,
  createCafeInDatabase,
  createCafeObject,
  findAndDeleteCafe,
  unsetCafeDetailsFromEmployees,
} = require("../utils/cafeUtils");
const { ERROR_STATUS_CODE, CAFE_ERROR } = require("../utils/constant");

const getCafes = asyncHandler(async (req, res, next) => {
  const location = req.query.location;
  // To make the location query case insensitive
  const locationQuery = new RegExp(location, "i");
  try {
    const projection = {
      cafeName: 1,
      description: 1,
      logo: 1,
      location: 1,
      cafeId: 1,
      numberOfEmployees: { $size: "$employees" },
    };

    const sort = {
      numberOfEmployees: -1, // Sort by numberOfEmployees in descending order
    };

    const match = location ? { location: locationQuery } : {};

    const cafes = await Cafe.aggregate([
      { $match: match },
      { $project: projection },
      { $sort: sort },
    ]);

    res.status(200).json({
      status: "OK",
      cafes,
    });
  } catch (error) {
    throwError(
      CAFE_ERROR.CAFES_FETCH_FAILED,
      ERROR_STATUS_CODE.SERVER_ERROR_500,
      next
    );
  }
});

const createCafe = asyncHandler(async (req, res, next) => {
  const { cafeName, description, location, logo } = req.body;

  const cafeObject = createCafeObject(cafeName, description, location, logo);
  try {
    const cafe = await createCafeInDatabase(cafeObject);
    const updatedCafe = getUpdatedCafe(cafe);

    res.status(200).json({
      status: "OK",
      cafe: updatedCafe,
    });
  } catch (error) {
    throwError(
      CAFE_ERROR.CAFE_CREATE_FAILED,
      ERROR_STATUS_CODE.SERVER_ERROR_500,
      next
    );
  }
});

const updateCafe = asyncHandler(async (req, res, next) => {
  try {
    const updatedCafe = await findAndUpdateCafe(req.params.id, req.body);

    if (!updatedCafe) {
      throwError(
        CAFE_ERROR.CAFE_NOT_FOUND,
        ERROR_STATUS_CODE.NOT_FOUND_404,
        next
      );
    }
    const cafeWithEmployeeCount = addNumberOfEmployees(updatedCafe);
    res.status(200).json({
      status: "OK",
      cafe: cafeWithEmployeeCount,
    });
  } catch (error) {
    throwError(
      CAFE_ERROR.CAFE_UPDATE_FAILED,
      ERROR_STATUS_CODE.SERVER_ERROR_500,
      next
    );
  }
});

const deleteCafe = asyncHandler(async (req, res, next) => {
  const cafeId = req.params.id;

  try {
    const deletedCafe = await findAndDeleteCafe(cafeId);

    if (!deletedCafe) {
      throwError(
        CAFE_ERROR.CAFE_DELETE_FAILED,
        ERROR_STATUS_CODE.NOT_FOUND_404,
        next
      );
    }

    await unsetCafeDetailsFromEmployees(deletedCafe);

    res.status(200).json({
      status: "OK",
      cafe: deletedCafe,
    });
  } catch (error) {
    throwError(
      CAFE_ERROR.CAFE_DELETE_FAILED,
      ERROR_STATUS_CODE.SERVER_ERROR_500,
      next
    );
  }
});

module.exports = { getCafes, createCafe, updateCafe, deleteCafe };
