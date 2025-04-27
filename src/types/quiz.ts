export interface Option {
  id: string;
  text: string;
  type: string;
}

export interface Question {
  id: number;
  text: string;
  options: Option[];
}

export interface QuizData {
  title: string;
  description: string;
  questions: Question[];
  results: {
    [key: string]: string;
  };
}

export interface PersonalityResult {
  type: string;
  description: string;
} 