// import createHttpError from 'http-errors';
import createHttpError from 'http-errors';
import {
  createWater,
  removeWater,
  updateWater,
  updateWaterRate,
} from '../services/water.js';
import { UsersCollection } from '../db/models/user.js';

/**
  |============================
  | create waterNote controller
  |============================
*/

export const createWaterNoteController = async (req, res) => {
  //   const userId = req.user._id;
  const userId = '6758cda906bf9963f634acd6';
  const { date, waterVolume } = req.body;

  const waterNote = await createWater({ userId, date, waterVolume });

  res.status(201).json({
    status: 201,
    message: 'Successfully create a water note',
    data: { waterNote },
  });
};

/**
  |============================
  | update waterNote controller
  |============================
*/
export const updateWaterNoteController = async (req, res, next) => {
  //   const userId = req.user._id;
  const userId = '6758cda906bf9963f634acd6';

  const { waterNoteId: _id } = req.params;
  const payload = { ...req.body };

  const updatedWaterNote = await updateWater({ _id, userId, payload });

  if (updatedWaterNote === null) {
    next(createHttpError(404, `WaterNote whith id ${_id} not found`));
    return;
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully updated a waterNote!',
    data: updatedWaterNote,
  });
};

/**
  |============================
  | delete waterNote controller
  |============================
*/

export const removeWaterNoteController = async (req, res, next) => {
  //   const userId = req.user._id;
  const userId = '6758cda906bf9963f634acd6';

  const { waterNoteId: _id } = req.params;

  const removedWaterNote = await removeWater({ _id, userId });

  if (!removedWaterNote) {
    next(createHttpError(404, `WaterNote with id ${_id} not found`));
    return;
  }

  res.status(204).json({ status: 204 });
};

/**
  |============================
  | update water rate controller
  |============================
*/

export const updateWaterRateController = async (req, res, next) => {
  // const userId = req.user._id;
  // const _id = '6758cda906bf9963f634acd6';

  const _id = '6759c583888cc9a0b67e7b82';

  const { waterRate } = req.body;

  const user = await UsersCollection.findOne({ _id });

  if (!user) {
    next(createHttpError(404, `User with id ${_id} not found`));
    return;
  }

  const updatedUser = await updateWaterRate({ _id, waterRate });

  res.status(200).json({
    status: 200,
    message: "Successfully updated user's waterRate!",
    data: updatedUser,
  });
};
