const Joi = require('joi');

const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map(detail => detail.message);
            return res.status(400).json({ success: false, message: errors.join(', ') });
        }
        next();
    };
};

const schemas = {
    register: Joi.object({
        name: Joi.string().min(2).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        phone: Joi.string().allow('').optional()
    }),
    login: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }),
    createBooking: Joi.object({
        turfId: Joi.string().required(),
        date: Joi.string().required(),
        time: Joi.string().required(),
        duration: Joi.number().integer().min(1).max(5).required(),
        userDetails: Joi.object({
            name: Joi.string().required(),
            phone: Joi.string().required(),
            email: Joi.string().email().allow('').optional()
        }).required()
    })
};

module.exports = { validate, schemas };
