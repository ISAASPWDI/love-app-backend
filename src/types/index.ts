// src/types/index.ts

export interface Note {
    id?: number;
    content: string;
    created_at?: Date;
  }
  
  export interface Memory {
    id?: number;
    image_url: string;
    caption?: string;
    created_at?: Date;
  }
  
  export interface TimelineEvent {
    id?: number;
    title: string;
    description?: string;
    event_date: Date | string;
    created_at?: Date;
  }
  
  export interface Compliment {
    id?: number;
    content: string;
    is_favorite?: boolean;
    created_at?: Date;
  }
  
  export interface QuizQuestion {
    id?: number;
    question: string;
    answer: string;
    created_at?: Date;
  }
  
  export interface QuizResult {
    totalQuestions: number;
    correctAnswers: number;
    score: number;
    answers: {
      questionId: number;
      question: string;
      userAnswer: string;
      correctAnswer: string;
      isCorrect: boolean;
    }[];
  }