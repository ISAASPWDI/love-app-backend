// src/models/quiz.model.ts
import pool from '../config/db.config';
import { QuizQuestion, QuizResult } from '../types';

class QuizModel {
  async create(question: QuizQuestion): Promise<number> {
    const result = await pool.query(
      'INSERT INTO quiz (question, answer) VALUES ($1, $2) RETURNING id',
      [question.question, question.answer]
    );
    return result.rows[0].id;
  }

  async findAll(): Promise<QuizQuestion[]> {
    const result = await pool.query(
      'SELECT * FROM quiz ORDER BY created_at DESC'
    );
    return result.rows;
  }

  async findById(id: number): Promise<QuizQuestion | null> {
    const result = await pool.query(
      'SELECT * FROM quiz WHERE id = $1',
      [id]
    );
    if (result.rows.length === 0) return null;
    return result.rows[0];
  }

  async update(id: number, question: QuizQuestion): Promise<boolean> {
    const result = await pool.query(
      'UPDATE quiz SET question = $1, answer = $2 WHERE id = $3',
      [question.question, question.answer, id]
    );
    return result.rowCount! > 0;
  }

  async delete(id: number): Promise<boolean> {
    const result = await pool.query(
      'DELETE FROM quiz WHERE id = $1',
      [id]
    );
    return result.rowCount! > 0;
  }

  async evaluateAnswers(answers: { questionId: number, answer: string }[]): Promise<QuizResult> {
    const result: QuizResult = {
      totalQuestions: answers.length,
      correctAnswers: 0,
      score: 0,
      answers: []
    };

    for (const answer of answers) {
      const queryResult = await pool.query(
        'SELECT question, answer FROM quiz WHERE id = $1',
        [answer.questionId]
      );
      
      if (queryResult.rows.length === 0) continue;
      
      const correctAnswer = queryResult.rows[0].answer;
      const isCorrect = answer.answer.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
      
      if (isCorrect) {
        result.correctAnswers++;
      }
      
      result.answers.push({
        questionId: answer.questionId,
        question: queryResult.rows[0].question,
        userAnswer: answer.answer,
        correctAnswer: correctAnswer,
        isCorrect
      });
    }
    
    result.score = result.totalQuestions > 0 
      ? Math.round((result.correctAnswers / result.totalQuestions) * 100) 
      : 0;
    
    return result;
  }
}

export default new QuizModel();