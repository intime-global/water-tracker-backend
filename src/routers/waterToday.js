import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getTodayWaterController } from '../controllers/water.js';

const router = Router();

router.get('/', ctrlWrapper(getTodayWaterController));

export default router;
