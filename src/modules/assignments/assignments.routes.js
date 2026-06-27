const express = require("express");
const router = express.Router();

const assignmentController = require("./assignments.controller");
const { protect } = require("../auth/auth.middleware");

router.use(protect);
router.post("/task",assignmentController.assignTaskToPerson);
router.delete("/task/:taskId",assignmentController.removeTaskAssignment);
router.get("/person-tasks/:personId",assignmentController.getTasksByPerson);
router.get("/task-person/:taskId",assignmentController.getPersonByTask);

router.post("/shift",assignmentController.assignPersonToShift);
router.delete("/shift",assignmentController.removePersonFromShift);

router.get("/shift-persons/:shiftId",assignmentController.getPersonsInShift);
router.get("/person-shifts/:personId",assignmentController.getShiftsByPerson);

module.exports = router;