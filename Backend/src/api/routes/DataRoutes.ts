import { Router } from 'express';
import { dataController } from '../controllers/DataController';
import multer from 'multer';

const upload = multer({ dest: './csv' });
const router = Router();

router
  .route('/')
  .get(dataController.get)
  .post(upload.single('file'), dataController.uploadFile);

export const dataRoutes = router;
