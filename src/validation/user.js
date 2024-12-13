
import Joi from 'joi';

import { genderEnum } from '../constants/users.js';
import { emailRegexp } from '../constants/users.js';

export const updateUsersCard = Joi.object({
    name: Joi.string().min(3).max(32).messages({
        'string.base': 'Username should be a string',
        'string.min': 'Username should have at least {#limit} characters',
        'string.max': 'Username should have at most {#limit} characters',

    }),
    email: Joi.string().pattern(emailRegexp).min(8).max(64).required().messages({
        'string.min': 'email should have at least {#limit} characters',
        'string.max': 'email should have at most {#limit} characters',
        'any.required': 'email is required',
    }),
    password: Joi.string().min(8).max(64).messages({
        'string.min': 'password should have at least {#limit} characters',
        'string.max': 'password should have at most {#limit} characters',
        'any.required': 'password is required',
    }),
    oldPassword:Joi.string().min(8).max(64).messages({
        'string.min': 'oldPassword should have at least {#limit} characters',
        'string.max': 'oldPassword should have at most {#limit} characters',
        'any.required': 'oldPassword is required',
    }),
    gender: Joi.string().valid(...genderEnum), enum: ['male', 'female'],
    daylyNorm: Joi.string().min(1000).max(15000),
    photo: Joi.string(),
});
