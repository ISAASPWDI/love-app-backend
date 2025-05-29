// src/models/quiz.model.ts
import { QuizQuestion, QuizResult } from '../types';

class QuizModel {
  private quizQuestions: QuizQuestion[] = [];
  private currentId = 1;

  constructor() {
    // Pregunta por defecto
    const defaultQuestions: Omit<QuizQuestion, 'id' | 'created_at'>[] = [
      { question: 'Aún no sabemos mucho de nosotros, pero ya habrá preguntas xd', answer: 'xddd' },
      { question: 'Con cuántos años te confundí, cuando hablamos por primera vez ? xd', answer: '18' },
    ];

    defaultQuestions.forEach(q => {
      this.quizQuestions.push({
        id: this.currentId++,
        question: q.question,
        answer: q.answer,
        created_at: new Date()
      });
    });
  }

  async create(question: QuizQuestion): Promise<number> {
    const newQuestion: QuizQuestion = {
      id: this.currentId++,
      question: question.question,
      answer: question.answer,
      created_at: new Date()
    };
    this.quizQuestions.push(newQuestion);
    return newQuestion.id!;
  }

  async findAll(): Promise<QuizQuestion[]> {
    return [...this.quizQuestions].sort((a, b) => b.created_at!.getTime() - a.created_at!.getTime());
  }

  async findById(id: number): Promise<QuizQuestion | null> {
    const question = this.quizQuestions.find(q => q.id === id);
    return question || null;
  }

  async update(id: number, question: QuizQuestion): Promise<boolean> {
    const index = this.quizQuestions.findIndex(q => q.id === id);
    if (index === -1) return false;
    this.quizQuestions[index] = {
      ...this.quizQuestions[index],
      question: question.question,
      answer: question.answer
    };
    return true;
  }

  async delete(id: number): Promise<boolean> {
    const index = this.quizQuestions.findIndex(q => q.id === id);
    if (index === -1) return false;
    this.quizQuestions.splice(index, 1);
    return true;
  }

  async evaluateAnswers(answers: { questionId: number, answer: string }[]): Promise<QuizResult> {
    const result: QuizResult = {
      totalQuestions: answers.length,
      correctAnswers: 0,
      score: 0,
      answers: []
    };

    for (const answer of answers) {
      const question = this.quizQuestions.find(q => q.id === answer.questionId);
      if (!question) continue;

      const isCorrect = answer.answer.toLowerCase().trim() === question.answer.toLowerCase().trim();

      if (isCorrect) {
        result.correctAnswers++;
      }

      result.answers.push({
        questionId: answer.questionId,
        question: question.question,
        userAnswer: answer.answer,
        correctAnswer: question.answer,
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
