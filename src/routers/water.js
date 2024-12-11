import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createWaterNoteShcema,
  updateWaterNoteShcema,
} from '../validation/water.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import {
  createWaterNoteController,
  removeWaterNoteController,
  updateWaterNoteController,
} from '../controllers/water.js';

import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

router.post(
  '/',
  validateBody(createWaterNoteShcema),
  ctrlWrapper(createWaterNoteController),
);

router.patch(
  '/:waterNoteId',
  isValidId,
  validateBody(updateWaterNoteShcema),
  ctrlWrapper(updateWaterNoteController),
);

router.delete(
  '/:waterNoteId',
  isValidId,
  ctrlWrapper(removeWaterNoteController),
);

export default router;
