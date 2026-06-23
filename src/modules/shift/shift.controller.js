const Shift = require("./shift.model");
const sendResponse = require("../../utills/response");

const createShift = async (req, res, next) => {
    try {
        const shift = await Shift.create(req.body);

        return sendResponse(
            res,
            201,
            true,
            "Shift created successfully",
            shift
        );
    } catch (error) {
        next(error);
    }
};

const getShifts = async (req, res, next) => {
    try {
        const shifts = await Shift.find()
            .populate("assignedPersons");

        return sendResponse(
            res,
            200,
            true,
            "Shift list fetched successfully",
            shifts
        );
    } catch (error) {
        next(error);
    }
};

const getShiftById = async (req, res, next) => {
    try {
        const shift = await Shift.findById(req.params.id)
            .populate("assignedPersons");

        return sendResponse(
            res,
            200,
            true,
            "Shift fetched successfully",
            shift
        );
    } catch (error) {
        next(error);
    }
};

const updateShift = async (req, res, next) => {
    try {
        const shift = await Shift.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        return sendResponse(
            res,
            200,
            true,
            "Shift updated successfully",
            shift
        );
    } catch (error) {
        next(error);
    }
};

const deleteShift = async (req, res, next) => {
    try {
        await Shift.findByIdAndDelete(req.params.id);

        return sendResponse(
            res,
            200,
            true,
            "Shift deleted successfully",
            {}
        );
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createShift,
    getShifts,
    getShiftById,
    updateShift,
    deleteShift
};