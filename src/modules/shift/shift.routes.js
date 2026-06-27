const express = require("express");
const router = express.Router();

const shiftController = require("./shift.controller");
const { protect } = require("../auth/auth.middleware");

router.use(protect);
router.post("/",shiftController.createShift);
router.get("/",shiftController.getShifts);
router.get("/:id",shiftController.getShiftById);
router.put("/:id",shiftController.updateShift);
router.delete("/:id",shiftController.deleteShift);

module.exports = router;