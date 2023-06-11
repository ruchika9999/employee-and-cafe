const express = require("express");
const router = express.Router();
const { requestValidator } = require("../middleWare/requestValidator");
const { cafeCreateValidationRules } = require("../validation/cafeValidation");

const {
  getCafes,
  createCafe,
  deleteCafe,
  updateCafe,
} = require("../controllers/cafeController");

router.get("/", getCafes);
router.post("/", cafeCreateValidationRules, requestValidator, createCafe);
router.put("/:id", updateCafe);
router.delete("/:id", deleteCafe);

module.exports = router;
