import { Router } from 'express';
import {
  createMemory,
  getAllMemories,
  getMemoryById,
  updateMemory,
  deleteMemory
} from '../controllers/memories.controller';

const router = Router();

router.post('/', createMemory);
router.get('/', getAllMemories);
router.get('/:id', getMemoryById);
router.put('/:id', updateMemory);
router.delete('/:id', deleteMemory);

export default router;
