// src/models/quiz.model.ts
import pool from '../config/db.config';
import { QuizQuestion, QuizResult } from '../types';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

class QuizModel {
  async create(question: QuizQuestion): Promise<number> {
    const [result] = await pool.execute<ResultSetHeader>(
      'INSERT INTO quiz (question, answer) VALUES (?, ?)',
      [question.question, question.answer]
    );
    return result.insertId;
  }

  async findAll(): Promise<QuizQuestion[]> {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM quiz ORDER BY created_at DESC'
    );
    return rows as QuizQuestion[];
  }

  async findById(id: number): Promise<QuizQuestion | null> {
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT * FROM quiz WHERE id = ?',
      [id]
    );
    if (rows.length === 0) return null;
    return rows[0] as QuizQuestion;
  }

  async update(id: number, question: QuizQuestion): Promise<boolean> {
    const [result] = await pool.execute<ResultSetHeader>(
      'UPDATE quiz SET question = ?, answer = ? WHERE id = ?',
      [question.question, question.answer, id]
    );
    return result.affectedRows > 0;
  }

  async delete(id: number): Promise<boolean> {
    const [result] = await pool.execute<ResultSetHeader>(
      'DELETE FROM quiz WHERE id = ?',
      [id]
    );
    return result.affectedRows > 0;
  }

  async evaluateAnswers(answers: { questionId: number, answer: string }[]): Promise<QuizResult> {
    const result: QuizResult = {
      totalQuestions: answers.length,
      correctAnswers: 0,
      score: 0,
      answers: []
    };

    for (const answer of answers) {
      const [rows] = await pool.execute<RowDataPacket[]>(
        'SELECT question, answer FROM quiz WHERE id = ?',
        [answer.questionId]
      );
      
      if (rows.length === 0) continue;
      
      const correctAnswer = rows[0].answer;
      const isCorrect = answer.answer.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
      
      if (isCorrect) {
        result.correctAnswers++;
      }
      
      result.answers.push({
        questionId: answer.questionId,
        question: rows[0].question,
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