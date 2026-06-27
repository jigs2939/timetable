const express = require("express");
const router = express.Router();

const personController = require("./person.controller");
const { protect } = require("../auth/auth.middleware");

router.use(protect);
router.post("/", personController.createPerson);
router.get("/", personController.getPersons);
router.get("/:id", personController.getPersonById);
router.put("/:id", personController.updatePerson);
router.delete("/:id", personController.deletePerson);

module.exports = router;


