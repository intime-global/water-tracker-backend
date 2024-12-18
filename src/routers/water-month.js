import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getWaterMonthController } from '../controllers/water.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getWaterMonthController));

export default router;
