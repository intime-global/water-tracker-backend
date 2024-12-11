import { Router } from 'express';

import UsersRouter from './auth.js';
import WatersRouter from './water.js';

const router = Router();

router.use('/auth', UsersRouter);

router.use('/waters', WatersRouter);

export default router;
