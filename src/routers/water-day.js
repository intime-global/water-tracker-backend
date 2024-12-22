import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getDayWaterController } from '../controllers/water.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getDayWaterController));

export default router;
