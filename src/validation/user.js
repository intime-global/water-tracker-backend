import Joi from 'joi';

import { genderEnum } from '../constants/users.js';
import { emailRegexp } from '../constants/users.js';

export const updateUsersCard = Joi.object({
  name: Joi.string().allow('').messages({
    'string.base': 'Username should be a string',
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
  }),
  email: Joi.string().pattern(emailRegexp).min(8).max(64).messages({
    'string.min': 'email should have at least {#limit} characters',
    'string.max': 'email should have at most {#limit} characters',
  }),
  oldPassword: Joi.string().min(8).max(64).messages({
    'string.min': 'password should have at least {#limit} characters',
    'string.max': 'password should have at most {#limit} characters',
  }),
  newPassword: Joi.string().min(8).max(64).messages({
    'string.min': 'password should have at least {#limit} characters',
    'string.max': 'password should have at most {#limit} characters',
  }),
  gender: Joi.string().valid(...genderEnum),
  waterRate: Joi.number(),
  photo: Joi.string(),
});
