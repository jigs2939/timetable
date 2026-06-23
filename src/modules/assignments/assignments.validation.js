const Joi = require("joi");

const assignTaskValidation = Joi.object({
    taskId: Joi.string()
        .required(),

    personId: Joi.string()
        .required()
});

const assignShiftValidation = Joi.object({
    shiftId: Joi.string()
        .required(),

    personId: Joi.string()
        .required()
});

module.exports = {
    assignTaskValidation,
    assignShiftValidation
};