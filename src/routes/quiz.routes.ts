import { Router } from 'express';
import {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  updateQuiz,
  deleteQuiz,
  evaluateQuizAnswers,
} from '../controllers/quiz.controller';

const router = Router();

router.post('/', createQuiz);
router.get('/', getAllQuizzes);
router.get('/:id', getQuizById);
router.put('/:id', updateQuiz);
router.delete('/:id', deleteQuiz);
router.post('/evaluate', evaluateQuizAnswers);

export default router;
