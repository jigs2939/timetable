const express = require("express");
const router = express.Router();

const taskController = require("./task.contoller");
const { protect } = require("../auth/auth.middleware");

router.use(protect);
router.post("/",taskController.createTask);
router.get("/",taskController.getTasks);
router.get("/:id",taskController.getTaskById);
router.put("/:id",taskController.updateTask);
router.delete("/:id",taskController.deleteTask);

module.exports = router;