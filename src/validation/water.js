import Joi from 'joi';

export const createWaterNoteShcema = Joi.object({
  date: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/)
    .required()
    .messages({
      'string.pattern.base':
        'Дата і час мають бути у форматі "YYYY-MM-DDThh:mm:ss".',
      'string.empty': 'Поле date не може бути порожнім.',
    }),
  waterVolume: Joi.number().min(50).max(5000).required(),
});

export const updateWaterNoteShcema = Joi.object({
  date: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/)
    .messages({
      'string.pattern.base':
        'Дата і час мають бути у форматі "YYYY-MM-DDThh:mm:ss".',
      'string.empty': 'Поле date не може бути порожнім.',
    }),
  waterVolume: Joi.number().min(50).max(5000),
});
