const { Employee } = require("../models/employeesModel");
const { Cafe } = require("../models/cafeModel");
const { generateId, generateNumber, getToday } = require("./helper");

const saveEmployee = async (employeeObj) => {
  return await Employee.create(employeeObj);
};

const updateCafeWithEmployee = async (cafeId, employeeId) => {
  await Cafe.findOneAndUpdate(
    { cafeId: cafeId },
    { $push: { employees: employeeId } },
    { new: true, upsert: true }
  );
};

const generateEmployeeObj = (
  gender,
  phoneNumber,
  emailAddress,
  employeeName,
  cafeOption
) => {
  const employeeObj = {
    employeeId: generateId("UI"),
    startDate: getToday(),
    gender,
    phoneNumber,
    emailAddress,
    employeeName,
    // after days different logic implemented this will be changed
    // this one generate for testing purpose
    daysWorkedInCafe: generateNumber(1, 30),
    cafeId: cafeOption?.value,
    cafeName: cafeOption?.placeName,
  };

  return employeeObj;
};

const findEmployeeById = async (employeeId) => {
  return await Employee.findOne({ employeeId });
};

const updateEmployeeData = async (employeeId, employeeData, cafeOption) => {
  const update = {
    ...employeeData,
    cafeName: cafeOption.placeName,
    cafeId: cafeOption.value,
  };

  return await Employee.findOneAndUpdate(
    { employeeId },
    { $set: update },
    { new: true }
  );
};

const updateCafeWithEmployeeId = async (cafeId, employeeId) => {
  return await Cafe.findOneAndUpdate(
    { cafeId },
    { $push: { employees: employeeId } },
    { new: true }
  );
};

const updatePreviousCafeWithEmployeeId = async (cafeId, employeeId) => {
  return await Cafe.findOneAndUpdate(
    { cafeId },
    { $pull: { employees: employeeId } },
    { new: true }
  );
};

module.exports = {
  saveEmployee,
  updateCafeWithEmployee,
  generateEmployeeObj,
  findEmployeeById,
  updateEmployeeData,
  updateCafeWithEmployeeId,
  updatePreviousCafeWithEmployeeId,
};
