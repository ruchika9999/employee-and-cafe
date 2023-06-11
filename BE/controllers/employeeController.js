const { Employee } = require("../models/employeesModel");
const { Cafe } = require("../models/cafeModel");

const asyncHandler = require("express-async-handler");
const { throwError } = require("../utils/helper");
const {
  saveEmployee,
  updateCafeWithEmployee,
  generateEmployeeObj,
  findEmployeeById,
  updateEmployeeData,
  updateCafeWithEmployeeId,
  updatePreviousCafeWithEmployeeId,
} = require("../utils/employeeUtils");

const { ERROR_STATUS_CODE, EMPLOYEE_ERROR } = require("../utils/constant");

const getEmployees = asyncHandler(async (req, res, next) => {
  const cafeId = req.query.cafe;

  try {
    let query = Employee.find({});

    if (cafeId) {
      query = query.where("cafeId", cafeId);
    }
    // query = query.sort("-daysWorkedInCafe").lean();

    const employees = await query.exec();

    res.status(200).json({
      status: "OK",
      employees,
    });
  } catch (error) {
    throwError(
      EMPLOYEE_ERROR.EMPLOYEES_FETCH_FAILED,
      ERROR_STATUS_CODE.SERVER_ERROR_500,
      next
    );
  }
});
const createEmployee = async (req, res, next) => {
  try {
    const { gender, phoneNumber, emailAddress, employeeName, cafeOption } =
      req.body;

    const employeeObj = generateEmployeeObj(
      gender,
      phoneNumber,
      emailAddress,
      employeeName,
      cafeOption
    );

    const savedEmployee = await saveEmployee(employeeObj);

    if (savedEmployee.cafeId) {
      await updateCafeWithEmployee(
        savedEmployee.cafeId,
        savedEmployee.employeeId
      );
    }
    res.status(200).json({
      status: "OK",
      employee: savedEmployee,
    });
  } catch (error) {
    throwError(
      EMPLOYEE_ERROR.EMPLOYEE_CREATE_FAILED,
      ERROR_STATUS_CODE.SERVER_ERROR_500,
      next
    );
  }
};

const updateEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { cafeOption, prvCafeId, ...employeeData } = req.body;

    const employee = await findEmployeeById(id);

    if (!employee) {
      throw new Error(
        EMPLOYEE_ERROR.EMPLOYEE_NOT_FOUND,
        ERROR_STATUS_CODE.NOT_FOUND_404,
        next
      );
    }

    const updateEmployeePromise = updateEmployeeData(
      id,
      employeeData,
      cafeOption
    );

    let updateCafePromise;
    let updatePrevCafePromise;

    if (cafeOption.value) {
      updateCafePromise = updateCafeWithEmployeeId(
        cafeOption.value,
        employee.employeeId
      );
    }

    if (prvCafeId) {
      updatePrevCafePromise = updatePreviousCafeWithEmployeeId(
        prvCafeId,
        employee.employeeId
      );
    }

    const [updatedEmployee, updatedCafe, updatedPrevCafe] = await Promise.all([
      updateEmployeePromise,
      updateCafePromise,
      updatePrevCafePromise,
    ]);

    res.status(200).json({
      status: "OK",
      employee: updatedEmployee,
    });
  } catch (error) {
    throwError(
      EMPLOYEE_ERROR.EMPLOYEE_UPDATE_FAILED,
      ERROR_STATUS_CODE.SERVER_ERROR_500,
      next
    );
  }
};

const deleteEmployee = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    res.status(404);
    throw new Error(
      EMPLOYEE_ERROR.EMPLOYEE_DELETE_FAILED,
      ERROR_STATUS_CODE.NOT_FOUND_404,
      next
    );
  }

  try {
    const employee = await Employee.findOneAndDelete({
      employeeId: id,
    });
    if (employee.cafeId) {
      const updatedCafe = await Cafe.updateOne(
        { cafeId: employee.cafeId },
        { $pull: { employees: employee.employeeId } },
        { new: true }
      );

      if (updatedCafe.matchedCount && updatedCafe.modifiedCount) {
        console.info("Update cafe with employee id");
      }
    }
    res.status(200).json({
      status: "OK",
      employee,
    });
  } catch (error) {
    throwError(
      EMPLOYEE_ERROR.EMPLOYEE_DELETE_FAILED,
      ERROR_STATUS_CODE.SERVER_ERROR_500,
      next
    );
  }
});

module.exports = {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
