
import Joi from 'joi';

import { genderEnum } from '../constants/user.js';
import { emailRegexp } from '../constants/user.js';

export const createUsersCard = Joi.object({
    name: Joi.string().min(3).max(20).messages({
        'string.base': 'Username should be a string',
        'string.min': 'Username should have at least {#limit} characters',
        'string.max': 'Username should have at most {#limit} characters',
        'any.required': 'Username is required',
    }),
    email: Joi.string().pattern(emailRegexp).min(10).max(30).required().messages({
        'string.min': 'email should have at least {#limit} characters',
        'string.max': 'email should have at most {#limit} characters',
        'any.required': 'email is required',
    }),
    gender: Joi.string().valid(...genderEnum),
    daylyNorm: Joi.string(),
    photo: Joi.string(),
    password: Joi.string(),
});

export const updateUsersCard = Joi.object({
    name: Joi.string().min(3).max(20).messages({
        'string.base': 'Username should be a string',
        'string.min': 'Username should have at least {#limit} characters',
        'string.max': 'Username should have at most {#limit} characters',
        'any.required': 'Username is required',
    }),
    email: Joi.string().pattern(emailRegexp).min(10).max(30).required().messages({
        'string.min': 'email should have at least {#limit} characters',
        'string.max': 'email should have at most {#limit} characters',
        'any.required': 'email is required',
    }),
    gender: Joi.string().valid(...genderEnum),
    daylyNorm: Joi.string().min(1000).max(15000),
    photo: Joi.string(),
    password: Joi.string(),
});
