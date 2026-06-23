const Joi = require("joi");

const createShiftValidation = Joi.object({
    day: Joi.string()
        .valid(
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
        )
        .required(),

    shiftName: Joi.string()
        .required(),

    startTime: Joi.string()
        .required(),

    endTime: Joi.string()
        .required()
});

const updateShiftValidation = Joi.object({
    day: Joi.string().valid(
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ),

    shiftName: Joi.string(),

    startTime: Joi.string(),

    endTime: Joi.string()
});

module.exports = {
    createShiftValidation,
    updateShiftValidation
};