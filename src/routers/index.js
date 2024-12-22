import { Router } from 'express';

import AuthRouter from './auth.js';
import UsersRouter from './users.js';
import WatersRouter from './water.js';
import WaterRateRouter from './water-rate.js';
import WaterTodayRouter from './water-today.js';
import WaterMonthRouter from './water-month.js';
import WaterDayRouter from './water-day.js';

const router = Router();

router.use('/auth', AuthRouter);

router.use('/users', UsersRouter);

router.use('/water/rate', WaterRateRouter);

router.use('/water/today', WaterTodayRouter);

router.use('/water/month', WaterMonthRouter);

router.use('/water', WatersRouter);

router.use('/water/day', WaterDayRouter);

export default router;
