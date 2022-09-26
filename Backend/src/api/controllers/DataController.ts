import { NextFunction, Request, Response } from 'express';
import { dataService } from '../../services/DataService';
import { AppError } from '../../utils/exceptions/AppError';

class DataController {
  public uploadFile(req: Request, res: Response, next: NextFunction) {
    const filePath = req.file?.path || '';
    if (!filePath) {
      next(
        new AppError({ description: 'File is not uploaded.', httpCode: 400 }),
      );
      return;
    }
    dataService
      .uploadFile(filePath)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error: AppError | Error) => {
        next(error);
      });
  }
}

export const dataController = new DataController();
