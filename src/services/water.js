import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/user.js';
import { WaterNotesCollection } from '../db/models/water.js';

import { CURRENT_DATE } from '../constants/waters.js';

export const createWater = async (payload) => {
  const user = await UsersCollection.findOne({ _id: payload.userId });

  if (!user) throw createHttpError(404, 'User not found');

  const waterNote = WaterNotesCollection.create(payload);

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

export const getTodayWaterNotes = async ({ _id, year, month, day }) => {
  const waterNotesQueryTod = await WaterNotesCollection.find({
    userId: _id,
    year,
    month,
    day,
  });

  return waterNotesQueryTod;
};

export const getMonthWaterNotes = async ({
  _id,
  month = CURRENT_DATE.CURRENT_MONTH,
  year = CURRENT_DATE.CURRENT_YEAR,
}) => {
  const monthWaterNotes = await WaterNotesCollection.aggregate([
    { $match: { userId: _id, month: month, year: year } },
    {
      $group: {
        _id: { day: '$day', month: '$month', year: '$year' },
        totalWaterVolume: { $sum: '$waterVolume' },
        totalConsumedTimes: { $sum: 1 },
        waterRate: { $last: '$waterRate' },
      },
    },
    {
      $addFields: {
        percentage: {
          $round: [
            {
              $multiply: [
                { $divide: ['$totalWaterVolume', '$waterRate'] },
                100,
              ],
            },
            0,
          ],
        },
      },
    },
    {
      $sort: { '_id.day': 1 },
    },
    {
      $project: {
        day: '$_id.day',
        month: '$_id.month',
        year: '$_id.year',
        waterVolume: '$totalWaterVolume',
        waterRate: '$waterRate',
        consumedTimes: '$totalConsumedTimes',
        _id: 0,
        percentage: 1,
      },
    },
  ]);

  return monthWaterNotes;
};
