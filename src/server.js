import express from 'express';
import cors from 'cors';
// import pino from 'pino-http';
import { env } from './utils/env.js';
import router from './routers/index.js';

import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import cookieParser from 'cookie-parser';

import { swaggerDocs } from './middlewares/swaggerDocs.js';
// import { UPLOAD_DIR } from './constants/index.js';
// import { logger } from './middlewares/logger.js';

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  app.use(
    express.json({
      type: ['application/json'],
      limit: '500kb',
    }),
  );

  app.use(
    cors({
      credentials: true,
      origin: [env('APP_DOMAIN'), 'http://localhost:5173'],
    }),
  );
  app.use(cookieParser());

  // app.use('/uploads', express.static(UPLOAD_DIR));
  app.use('/api-docs', swaggerDocs());

  app.use(router);

  // app.use(logger);

  app.use(notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
