import { Router } from 'express';

import AuthRouter from './auth.js';
import WatersRouter from './water.js';
import WaterRateRouter from './waterRate.js';
import WaterTodayRouter from './waterToday.js';
import UsersRouter from './users.js';

const router = Router();

router.use('/auth', AuthRouter);

router.use('/users', UsersRouter);

router.use('/waters', WatersRouter);

router.use('/waterRate', WaterRateRouter);

router.use('/waterToday', WaterTodayRouter);

export default router;
