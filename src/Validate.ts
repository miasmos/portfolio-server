import Joi = require('joi');

const Email = {
    subject: Joi.string()
        .max(255)
        .required(),
    body: Joi.string()
        .max(2000)
        .required(),
    sender: Joi.string()
        .email()
        .required()
};

export const Validate = { Email };
