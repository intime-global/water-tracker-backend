import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const isValidId = (req, res, next) => {
  const { waterNoteId } = req.params;

  if (!isValidObjectId(waterNoteId)) {
    throw createHttpError(400, 'Bad Request not valid ID');
  }

  next();
};
