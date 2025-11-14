import { Router } from 'express';
import { uploadImage } from '../controllers/uploadController';
import { authenticate } from '../middlewares/authMiddleware';
import { upload } from '../middlewares/multerMiddleware';

const router = Router();

router.post('/upload', authenticate, upload.single('image'), uploadImage);

export default router;