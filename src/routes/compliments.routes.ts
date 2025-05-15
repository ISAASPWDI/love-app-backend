import { Router } from 'express';
import {
  createCompliment,
  getAllCompliments,
  getComplimentById,
  updateCompliment,
  deleteCompliment
} from '../controllers/compliments.controller';

const router = Router();

router.post('/', createCompliment);
router.get('/', getAllCompliments);
router.get('/:id', getComplimentById);
router.put('/:id', updateCompliment);
router.delete('/:id', deleteCompliment);

export default router;
