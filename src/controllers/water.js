// import createHttpError from 'http-errors';
import createHttpError from 'http-errors';
import {
  createWater,
  getMonthWaterNotes,
  getTodayWaterNotes,
  removeWater,
  updateWater,
  updateWaterRate,
} from '../services/water.js';
import { UsersCollection } from '../db/models/user.js';
import { parseDateParams } from '../utils/parseDateParams.js';

/**
  |============================
  | create waterNote controller
  |============================
*/

export const createWaterNoteController = async (req, res) => {
  const userId = req.user._id;
  const waterRate = req.user.waterRate;

  const { date, waterVolume } = req.body;

  const [datePart, time] = date.split('T');

  const [year, month, day] = datePart.split('-'); // Розділяємо дату

  const payload = { userId, year, month, day, time, waterVolume, waterRate };

  const waterNote = await createWater(payload);

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
  const userId = req.user._id;

  const { waterNoteId: _id } = req.params;

  let payload = {};
  let payloadTime = {};
  let payloadWater = {};

  if (req.body.date) {
    const [datePart, time] = req.body.date.split('T');
    const [year, month, day] = datePart.split('-');

    payloadTime = { year, month, day, time };
  }
  if (req.body.waterVolume) {
    payloadWater = { waterVolume: req.body.waterVolume };
  }

  payload = { ...payloadTime, ...payloadWater };

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
  const userId = req.user._id;

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
  const _id = req.user._id;

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

/**
  |============================
  | get today water controller
  |============================
*/

export const getTodayWaterController = async (req, res, next) => {
  const _id = req.user._id;

  const user = await UsersCollection.findOne({ _id });
  if (!user) {
    next(createHttpError(404, 'User not found'));
    return;
  }

  let day, month, year;

  if (req.query && Object.keys(req.query).length > 0) {
    const parsedParams = parseDateParams(req.query);

    if (!parsedParams.year || !parsedParams.month || !parsedParams.day) {
      next(createHttpError(400, 'Bad query params'));
      return;
    }

    ({ day, month, year } = parsedParams);
  } else {
    const today = new Date().toISOString();
    const [datePart] = today.split('T');
    [year, month, day] = datePart.split('-');
  }

  const todayNotes = await getTodayWaterNotes({ _id, year, month, day });

  const waterGoal = todayNotes[0]?.waterRate;

  const consumedToday = todayNotes.reduce(
    (acc, note) => acc + note.waterVolume,
    0,
  );

  let percentage = 0;
  if (waterGoal) {
    percentage = Math.ceil((consumedToday * 100) / waterGoal);
  }

  const message =
    todayNotes.length > 0
      ? 'Successfully found water notes!'
      : 'There are no notes for this day';

  res.status(200).json({
    status: 200,
    message,
    data: { notes: todayNotes, percentage },
  });
};

/**
  |============================
  | get month water controller
  |============================
*/

export const getWaterMonthController = async (req, res) => {
  const _id = req.user._id;

  const { month, year } = parseDateParams(req.query);

  const monthNotes = await getMonthWaterNotes({ _id, month, year });

  const lastElement = monthNotes[monthNotes.length - 1];

  console.log(lastElement, 'lastElement');

  if (monthNotes.length > 0 && lastElement.waterRate !== req.user.waterRate) {
    lastElement.percentage = Math.round(
      (lastElement.waterVolume / req.user.waterRate) * 100,
    );
  }

  const message =
    monthNotes.length > 0
      ? 'Successfully found water notes!'
      : 'There are no notes for this month';

  res.status(200).json({ status: 200, message, data: monthNotes });
};
