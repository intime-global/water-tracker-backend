import { Router } from 'express';

import UsersRouter from './auth.js';

const router = Router();

router.use('/auth', UsersRouter);

export default router;
