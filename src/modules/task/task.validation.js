const Joi = require("joi");

const createTaskValidation = Joi.object({
    title: Joi.string()
        .required(),

    description: Joi.string()
        .allow(""),

    priority: Joi.string()
        .valid(
            "Low",
            "Medium",
            "High"
        )
        .required(),

    status: Joi.string()
        .valid(
            "Pending",
            "In Progress",
            "Completed"
        )
});

const updateTaskValidation = Joi.object({
    title: Joi.string(),

    description: Joi.string()
        .allow(""),

    priority: Joi.string()
        .valid(
            "Low",
            "Medium",
            "High"
        ),

    status: Joi.string()
        .valid(
            "Pending",
            "In Progress",
            "Completed"
        )
});

module.exports = {
    createTaskValidation,
    updateTaskValidation
};