const Task = require("./task.model");
const sendResponse = require("../../utills/response");

const createTask = async (req, res, next) => {
    try {
        const task = await Task.create(req.body);

        return sendResponse(
            res,
            201,
            true,
            "Task created successfully",
            task
        );
    } catch (error) {
        next(error);
    }
};

const getTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find()
            .populate("assignedTo");

        return sendResponse(
            res,
            200,
            true,
            "Task list fetched successfully",
            tasks
        );
    } catch (error) {
        next(error);
    }
};

const getTaskById = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id)
            .populate("assignedTo");

        return sendResponse(
            res,
            200,
            true,
            "Task fetched successfully",
            task
        );
    } catch (error) {
        next(error);
    }
};

const updateTask = async (req, res, next) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        return sendResponse(
            res,
            200,
            true,
            "Task updated successfully",
            task
        );
    } catch (error) {
        next(error);
    }
};

const deleteTask = async (req, res, next) => {
    try {
        await Task.findByIdAndDelete(req.params.id);

        return sendResponse(
            res,
            200,
            true,
            "Task deleted successfully",
            {}
        );
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
};