const express = require("express");
const router = express.Router();

console.log("Person Route Loaded");
const personController = require("./person.controller");

router.post("/", personController.createPerson);
router.get("/", personController.getPersons);
router.get("/:id", personController.getPersonById);
router.put("/:id", personController.updatePerson);
router.delete("/:id", personController.deletePerson);

module.exports = router;


