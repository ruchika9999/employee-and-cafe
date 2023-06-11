const { Cafe } = require("../models/cafeModel");
const { Employee } = require("../models/employeesModel");
const { generateId } = require("./helper");

const findAndUpdateCafe = async (id, updateData) => {
  return await Cafe.findOneAndUpdate(
    { cafeId: id },
    { $set: updateData },
    { new: true }
  ).lean();
};

const createCafeInDatabase = async (cafeObject) => {
  const cafe = new Cafe(cafeObject);
  return await cafe.save();
};

const findAndDeleteCafe = async (cafeId) => {
  return await Cafe.findOneAndDelete({ cafeId });
};

const unsetCafeDetailsFromEmployees = async (deletedCafe) => {
  if (deletedCafe.employees.length > 0) {
    await Employee.updateMany(
      { cafeId: deletedCafe.cafeId },
      { $unset: { cafeId: "", cafeName: "" } }
    );
  }
};


const addNumberOfEmployees = (cafe) => {
  return {
    ...cafe,
    numberOfEmployees: cafe.employees.length,
  };
};

const getUpdatedCafe = (cafe) => {
  return {
    cafeName: cafe.cafeName,
    description: cafe.description,
    location: cafe.location,
    cafeId: cafe.cafeId,
    numberOfEmployees: cafe.employees.length,
    logo: cafe.logo,
  };
};

const createCafeObject = (cafeName, description, location, logo) => {
  const cafeId = generateId("CA");

  return {
    cafeName,
    description,
    location,
    cafeId,
    logo,
  };
};

module.exports = {
  findAndUpdateCafe,
  addNumberOfEmployees,
  getUpdatedCafe,
  createCafeInDatabase,
  createCafeObject,
  findAndDeleteCafe,
  unsetCafeDetailsFromEmployees,
};
