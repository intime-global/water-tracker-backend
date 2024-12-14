import { Router } from 'express';

import AuthRouter from './auth.js';
import UsersRouter from './users.js';
import WatersRouter from './water.js';
import WaterRateRouter from './waterRate.js';
import WaterTodayRouter from './waterToday.js';
import WaterMonthRouter from './waterMonth.js';

import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.use('/auth', AuthRouter);

router.use(authenticate);

router.use('/users', UsersRouter);

router.use('/waters', WatersRouter);

router.use('/waterRate', WaterRateRouter);

router.use('/waterToday', WaterTodayRouter);

router.use('/waterMonth', WaterMonthRouter);

export default router;
