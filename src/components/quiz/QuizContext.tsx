"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import quizData from "@/data/quiz.json";
import { logQuizResult } from "@/lib/supabase";

type Option = {
  id: string;
  text: string;
  type: string;
};

type Question = {
  id: number;
  text: string;
  options: Option[];
};

interface QuizContextType {
  currentQuestion: number;
  answers: Option[];
  result: string | null;
  isComplete: boolean;
  showStart: boolean;
  quizData: { questions: Question[] };
  isLoading: boolean;
  selectAnswer: (questionId: number, option: Option) => void;
  resetQuiz: () => void;
  setShowStart: (show: boolean) => void;
}

export const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Option[]>([]);
  const [result, setResult] = useState<string | null>(null);
  const [showStart, setShowStart] = useState(true);
  const [isLoading] = useState(false);

  // Initialize session when quiz starts
  useEffect(() => {
    if (!showStart && currentQuestion === 0) {
      // Only generate new session if one doesn't exist
      if (!localStorage.getItem('quiz_session_id')) {
        const sessionId = crypto.randomUUID();
        localStorage.setItem('quiz_session_id', sessionId);
        // Log quiz start
        logQuizResult('', sessionId, false).catch(console.error);
      }
    }
  }, [showStart, currentQuestion]);

  // Priority order for tie-breaking
  const priorityOrder = [
    "Flash Fry",
    "Big Bucks Bao",
    "Loco Taco",
    "Talkayaki",
    "Namastew",
    "Boba Babe",
  ];

  const calculateResult = (answers: Option[]) => {
    const scores: { [key: string]: number } = {
      "Big Bucks Bao": 0,
      "Talkayaki": 0,
      "Loco Taco": 0,
      "Flash Fry": 0,
      "Boba Babe": 0,
      "Namastew": 0
    };

    // Count the scores for each personality type
    answers.forEach((option) => {
      if (option.type) {
        scores[option.type] = (scores[option.type] || 0) + 1;
      }
    });

    // Find the personality types with the highest score
    let maxScore = 0;
    let highestScoringTypes: string[] = [];
    
    Object.entries(scores).forEach(([type, score]) => {
      if (score > maxScore) {
        maxScore = score;
        highestScoringTypes = [type];
      } else if (score === maxScore) {
        highestScoringTypes.push(type);
      }
    });

    // If there's a tie, use the priority order to break it
    if (highestScoringTypes.length > 1) {
      highestScoringTypes.sort((a, b) => {
        return priorityOrder.indexOf(a) - priorityOrder.indexOf(b);
      });
    }

    return highestScoringTypes[0];
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
    setShowStart(true);
    // Clear the session ID when resetting the quiz
    localStorage.removeItem('quiz_session_id');
  };

  const selectAnswer = (questionId: number, option: Option) => {
    setAnswers([...answers, option]);
    
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const finalResult = calculateResult([...answers, option]);
      setResult(finalResult);
    }
  };

  const value = {
    currentQuestion,
    answers,
    result,
    isComplete: result !== null,
    showStart,
    quizData,
    isLoading,
    selectAnswer,
    resetQuiz,
    setShowStart,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
};