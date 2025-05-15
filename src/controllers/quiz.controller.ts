import { Request, Response } from 'express';
import QuizModel from '../models/quiz.model';
import { QuizQuestion } from '../types';

export async function createQuiz(req: Request, res: Response): Promise<void> {
  try {
    const question: QuizQuestion = req.body;
    if (!question.question || !question.answer) {
      res.status(400).json({ message: 'Question and answer are required' });
      return;
    }
    const id = await QuizModel.create(question);
    const createdQuestion = await QuizModel.findById(id);
    res.status(201).json(createdQuestion);
  } catch (error) {
    console.error('Error creating quiz question:', error);
    res.status(500).json({ message: 'Error creating quiz question', error });
  }
}

export async function getAllQuizzes(req: Request, res: Response) {
  try {
    const questions = await QuizModel.findAll();
    res.status(200).json(questions);
  } catch (error) {
    console.error('Error fetching quiz questions:', error);
    res.status(500).json({ message: 'Error fetching quiz questions', error });
  }
}

export async function getQuizById(req: Request, res: Response): Promise<void> {
  try {
    const id = parseInt(req.params.id);
    const question = await QuizModel.findById(id);
    if (!question) {
      res.status(404).json({ message: 'Quiz question not found' });
      return;
    }
    res.status(200).json(question);
  } catch (error) {
    console.error('Error fetching quiz question:', error);
    res.status(500).json({ message: 'Error fetching quiz question', error });
  }
}

export async function updateQuiz(req: Request, res: Response): Promise<void> {
  try {
    const id = parseInt(req.params.id);
    const question: QuizQuestion = req.body;
    if (!question.question || !question.answer) {
      res.status(400).json({ message: 'Question and answer are required' });
      return;
    }
    const exists = await QuizModel.findById(id);
    if (!exists) {
      res.status(404).json({ message: 'Quiz question not found' });
      return;
    }
    await QuizModel.update(id, question);
    const updated = await QuizModel.findById(id);
    res.status(200).json(updated);
  } catch (error) {
    console.error('Error updating quiz question:', error);
    res.status(500).json({ message: 'Error updating quiz question', error });
  }
}

export async function deleteQuiz(req: Request, res: Response): Promise<void> {
  try {
    const id = parseInt(req.params.id);
    const exists = await QuizModel.findById(id);
    if (!exists) {
      res.status(404).json({ message: 'Quiz question not found' });
      return;
    }
    await QuizModel.delete(id);
    res.status(200).json({ message: 'Quiz question deleted successfully' });
  } catch (error) {
    console.error('Error deleting quiz question:', error);
    res.status(500).json({ message: 'Error deleting quiz question', error });
  }
}

export async function evaluateQuizAnswers(req: Request, res: Response): Promise<void> {
  try {
    const answers = req.body.answers;
    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      res.status(400).json({ message: 'Answers array is required' });
      return;
    }
    for (const answer of answers) {
      if (!answer.questionId || answer.answer === undefined) {
        res.status(400).json({ message: 'Each answer must contain questionId and answer' });
        return;
      }
    }
    const result = await QuizModel.evaluateAnswers(answers);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error evaluating quiz answers:', error);
    res.status(500).json({ message: 'Error evaluating quiz answers', error });
  }
}
