/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express';
import { errorHandler } from './utils/exceptions/ErrorHandler';
import { NextFunction, Request, Response } from 'express';
import { AppError } from './utils/exceptions/AppError';
import { dataRoutes } from './api/routes/DataRoutes';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

//Routes
app.use('/api/data', dataRoutes);

//Error handling middlewares
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(
    new AppError({
      httpCode: 404,
      description: `Can't find ${req.originalUrl} on this server!`,
    }),
  );
});
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler.handleError(err, res);
});

export default app;
