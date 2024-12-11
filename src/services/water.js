import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/user.js';
import { WaterNotesCollection } from '../db/models/water.js';

export const createWater = async ({ userId, date, waterVolume }) => {
  const user = await UsersCollection.findOne({ _id: userId });

  if (!user) throw createHttpError(404, 'User not found');

  const waterNote = WaterNotesCollection.create({
    userId,
    date,
    waterVolume,
  });

  return waterNote;
};

export const updateWater = async ({ _id, userId, payload }) => {
  const updatedWaterNote = await WaterNotesCollection.findOneAndUpdate(
    { _id, userId },
    payload,
  );
  if (!updatedWaterNote) return null;

  return updatedWaterNote;
};
