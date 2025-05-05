"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { QuizData, Option } from "@/types/quiz";
import quizJsonData from "@/data/quiz.json";

type PersonalityScore = {
  [key: string]: number;
};

type QuizContextType = {
  currentQuestion: number;
  answers: { [key: number]: Option };
  quizData: QuizData | null;
  isLoading: boolean;
  isComplete: boolean;
  result: string | null;
  setCurrentQuestion: (question: number) => void;
  selectAnswer: (question: number, option: Option) => void;
  calculateResult: () => void;
  resetQuiz: () => void;
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: Option }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  // Priority order for tie-breaking (matches the Python snippet)
  const priorityOrder = [
    "Flash Fry",
    "Big Bucks Bao",
    "Loco Taco",
    "Talkayaki",
    "Namastew",
    "Boba Babe",
  ];

  useEffect(() => {
    // Directly use the imported quiz data
    setQuizData(quizJsonData);
    setIsLoading(false);
  }, []);

  const selectAnswer = (questionId: number, option: Option) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
    
    // Move to next question if not at the end
    if (quizData && currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (quizData && currentQuestion === quizData.questions.length - 1) {
      setIsComplete(true);
      calculateResult();
    }
  };

  const calculateResult = () => {
    if (!quizData) return;

    const scores: PersonalityScore = {
      "Big Bucks Bao": 0,
      "Talkayaki": 0,
      "Loco Taco": 0,
      "Flash Fry": 0,
      "Boba Babe": 0,
      "Namastew": 0
    };

    // Count the scores for each personality type
    Object.values(answers).forEach((option) => {
      // Direct mapping for the new quiz format
      const personalityType = option.type;
      if (personalityType) {
        scores[personalityType] = (scores[personalityType] || 0) + 1;
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

    setResult(highestScoringTypes[0]);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setIsComplete(false);
    setResult(null);
  };

  return (
    <QuizContext.Provider
      value={{
        currentQuestion,
        answers,
        quizData,
        isLoading,
        isComplete,
        result,
        setCurrentQuestion,
        selectAnswer,
        calculateResult,
        resetQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
}; 