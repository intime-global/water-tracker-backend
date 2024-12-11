import { Router } from 'express';

import UsersRouter from './auth.js';
import WatersRouter from './water.js';
import WaterRateRouter from './waterRate.js';

const router = Router();

router.use('/auth', UsersRouter);

router.use('/waters', WatersRouter);

router.use('/waterRate', WaterRateRouter);

export default router;
