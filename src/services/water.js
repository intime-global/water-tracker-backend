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

export const removeWater = async ({ _id, userId }) => {
  const removedWaterNote = await WaterNotesCollection.findOneAndDelete({
    _id,
    userId,
  });

  return removedWaterNote;
};

export const updateWaterRate = async ({ _id, waterRate }) => {
  const updatedUser = await UsersCollection.findOneAndUpdate(
    { _id },
    { waterRate },
    { new: true },
  );

  return updatedUser;
};