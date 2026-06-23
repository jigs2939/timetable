const Task = require("../task/task.model");
const Shift = require("../shift/shift.model");
const Person = require("../person/person.model");
const sendResponse = require("../../utills/response");

const assignTaskToPerson = async (req, res, next) => {
    try {
        const { taskId, personId } = req.body;

        const task = await Task.findByIdAndUpdate(
            taskId,
            {
                assignedTo: personId
            },
            { new: true }
        ).populate("assignedTo");

        return sendResponse(
            res,
            200,
            true,
            "Task assigned successfully",
            task
        );
    } catch (error) {
        next(error);
    }
};

const removeTaskAssignment = async (
    req,
    res,
    next
) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.taskId,
            {
                assignedTo: null
            },
            { new: true }
        );

        return sendResponse(
            res,
            200,
            true,
            "Assignment removed successfully",
            task
        );
    } catch (error) {
        next(error);
    }
};

const getTasksByPerson = async (
    req,
    res,
    next
) => {
    try {
        const tasks = await Task.find({
            assignedTo: req.params.personId
        });

        return sendResponse(
            res,
            200,
            true,
            "Tasks fetched successfully",
            tasks
        );
    } catch (error) {
        next(error);
    }
};

const getPersonByTask = async (
    req,
    res,
    next
) => {
    try {
        const task = await Task.findById(
            req.params.taskId
        ).populate("assignedTo");

        return sendResponse(
            res,
            200,
            true,
            "Person fetched successfully",
            task.assignedTo
        );
    } catch (error) {
        next(error);
    }
};

const assignPersonToShift = async (
    req,
    res,
    next
) => {
    try {
        const { shiftId, personId } = req.body;

        const shift = await Shift.findByIdAndUpdate(
            shiftId,
            {
                $addToSet: {
                    assignedPersons: personId
                }
            },
            { new: true }
        ).populate("assignedPersons");

        return sendResponse(
            res,
            200,
            true,
            "Person assigned to shift successfully",
            shift
        );
    } catch (error) {
        next(error);
    }
};

const removePersonFromShift = async (
    req,
    res,
    next
) => {
    try {
        const { shiftId, personId } = req.body;

        const shift = await Shift.findByIdAndUpdate(
            shiftId,
            {
                $pull: {
                    assignedPersons: personId
                }
            },
            { new: true }
        );

        return sendResponse(
            res,
            200,
            true,
            "Person removed from shift successfully",
            shift
        );
    } catch (error) {
        next(error);
    }
};

const getPersonsInShift = async (
    req,
    res,
    next
) => {
    try {
        const shift = await Shift.findById(
            req.params.shiftId
        ).populate("assignedPersons");

        return sendResponse(
            res,
            200,
            true,
            "Persons fetched successfully",
            shift.assignedPersons
        );
    } catch (error) {
        next(error);
    }
};

const getShiftsByPerson = async (
    req,
    res,
    next
) => {
    try {
        const shifts = await Shift.find({
            assignedPersons: req.params.personId
        });

        return sendResponse(
            res,
            200,
            true,
            "Shifts fetched successfully",
            shifts
        );
    } catch (error) {
        next(error);
    }
};

module.exports = {
    assignTaskToPerson,
    removeTaskAssignment,
    getTasksByPerson,
    getPersonByTask,
    assignPersonToShift,
    removePersonFromShift,
    getPersonsInShift,
    getShiftsByPerson
};