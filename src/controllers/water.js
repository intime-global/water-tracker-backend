// import createHttpError from 'http-errors';
import createHttpError from 'http-errors';
import { createWater, updateWater } from '../services/water.js';

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
