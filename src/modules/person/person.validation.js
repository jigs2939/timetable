const Joi = require("joi");

const createPersonValidation = Joi.object({
    name: Joi.string()
        .trim()
        .required(),

    email: Joi.string()
        .email()
        .required(),

    mobile: Joi.string()
        .min(10)
        .max(15)
        .required(),

    role: Joi.string()
        .required(),

    status: Joi.boolean()
});

const updatePersonValidation = Joi.object({
    name: Joi.string().trim(),

    email: Joi.string().email(),

    mobile: Joi.string()
        .min(10)
        .max(15),

    role: Joi.string(),

    status: Joi.boolean()
});

module.exports = {
    createPersonValidation,
    updatePersonValidation
};