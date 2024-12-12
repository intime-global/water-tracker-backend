import { Router } from 'express';

import UsersRouter from './auth.js';
import WatersRouter from './water.js';
import WaterRateRouter from './waterRate.js';
import WaterTodayRouter from './waterToday.js';

const router = Router();

router.use('/auth', UsersRouter);

router.use('/waters', WatersRouter);

router.use('/waterRate', WaterRateRouter);

router.use('/waterToday', WaterTodayRouter);

export default router;
