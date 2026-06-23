const express = require("express");
const router = express.Router();

const shiftController = require("./shift.controller");


router.post("/",shiftController.createShift);
router.get("/",shiftController.getShifts);
router.get("/:id",shiftController.getShiftById);
router.put("/:id",shiftController.updateShift);
router.delete("/:id",shiftController.deleteShift);

module.exports = router;