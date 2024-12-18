import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { updateWaterRateSchema } from '../validation/water.js';
import { updateWaterRateController } from '../controllers/water.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.use(authenticate);

router.patch(
  '/',
  validateBody(updateWaterRateSchema),
  ctrlWrapper(updateWaterRateController),
);

export default router;
