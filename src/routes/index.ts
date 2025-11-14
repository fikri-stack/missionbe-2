import { Router } from 'express';
import authRoutes from './authRoutes';
import courseRoutes from './courseRoutes';
import dataRoutes from './dataRoutes';
import uploadRoutes from './uploadRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/data', dataRoutes);
router.use('/', courseRoutes);
router.use('/', uploadRoutes);

export default router;