const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    username:  {
        type: String,
        required: true,
        dropDups: true
    },
    email: {
        type: String,
        required: true,
        dropDups: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Number,
        required: true
    },
    modifiedAt: {
        type: Number,
        require: true
    }
});

/* Joi schema */
const joiUser = Joi.object({
    username: Joi.string()
                .alphanum()
                .min(5)
                .max(30)
                .required(),
    email: Joi.string()
                .alphanum()
                .min(5)
                .max(64)
                .required(),
    password: Joi.string()
                .min(8)
                .max(64)
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
                .required(),
    createdAt: Joi.number()
                .required(),
    modifiedAt: Joi.number()
                .required()
})

const User = mongoose.model('User', userSchema);

module.exports =  { User, joiUser }