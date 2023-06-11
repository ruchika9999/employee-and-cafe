const express = require("express");
const router = express.Router();

const { requestValidator } = require("../middleWare/requestValidator");
const {
  employeeCreateValidationRules,
} = require("../validation/employeeValidation");

const {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

router.get("/", getEmployees);
router.post(
  "/",
  employeeCreateValidationRules,
  requestValidator,
  createEmployee
);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

module.exports = router;
