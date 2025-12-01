import express from 'express';
import DataController from '../controllers/dataController';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();

// Semua routes butuh authentication (JWT token di header)
// GET /api/data - Get all modules
router.get('/', authenticate, DataController.getAllData);

// GET /api/data/:id - Get module by ID
router.get('/:id', authenticate, DataController.getDataById);

// POST /api/data - Create new module
router.post('/', authenticate, DataController.createData);

// PATCH /api/data/:id - Update module by ID
router.patch('/:id', authenticate, DataController.updateData);

// DELETE /api/data/:id - Delete module by ID
router.delete('/:id', authenticate, DataController.deleteData);

export default router;