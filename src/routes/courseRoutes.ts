import { Router } from 'express';
import { getCourses } from '../controllers/courseController';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

router.get('/courses', authenticate, getCourses);

export default router;