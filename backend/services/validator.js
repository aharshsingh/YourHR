const Joi = require('joi');

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{4,16}$')).required()
});

const registerSchema = Joi.object({
    FirstName: Joi.string().required(),
    LastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{4,16}$')).required()
});

const tokenSchema = Joi.object({
    token : Joi.string().required()
});

module.exports = { loginSchema, tokenSchema, registerSchema};