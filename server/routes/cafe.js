const express = require("express");
const router = express.Router();
const { validateCafeCreate } = require("../middleware/cafeValidation");

const {
  getCafes,
  createCafe,
  deleteCafe,
  updateCafe,
} = require("../controllers/cafeController");

router.get("/", getCafes);
router.post("/", validateCafeCreate, createCafe);
router.put("/:id", updateCafe);
router.delete("/:id", deleteCafe);

module.exports = router;
