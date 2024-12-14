import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getWaterMonthController } from '../controllers/water.js';

const router = Router();

router.get('/', ctrlWrapper(getWaterMonthController));

export default router;
