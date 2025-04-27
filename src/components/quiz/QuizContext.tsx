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

  // Personality type mapping
  const personalityMapping: { [key: string]: string } = {
    "Impulsive": "Flash Fry",
    "Mindful": "Steamy Sage",
    "Adventurous": "Loco Taco",
    "Practical": "Big Bucks Bun",
    "Extrovert": "Yappy Sushi",
    "Cautious": "Steamy Sage",
    "Efficient": "Flash Fry",
    "Indulgent": "Steamy Sage",
    "Minimalist": "Steamy Sage",
    "Comfort-Seeker": "Boba Babe",
    "Risk-Taker": "Loco Taco",
    "Value-Conscious": "Big Bucks Bun",
    "Community-Oriented": "Yappy Sushi",
    "Resourceful": "Big Bucks Bun",
    "Organized": "Big Bucks Bun",
    "Spontaneous": "Boba Babe",
    "Emotional": "Boba Babe",
    "Charismatic": "Yappy Sushi",
    "Relationship-Focused": "Yappy Sushi",
    "Goal-Oriented": "Flash Fry",
    "Variety-Seeker": "Loco Taco",
    "Generous": "Yappy Sushi",
    "Convenience-Lover": "Flash Fry"
  };

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
      "Big Bucks Bun": 0,
      "Yappy Sushi": 0,
      "Loco Taco": 0,
      "Flash Fry": 0,
      "Boba Babe": 0,
      "Steamy Sage": 0
    };

    // Count the scores for each personality type
    Object.values(answers).forEach((option) => {
      const personalityType = personalityMapping[option.type];
      if (personalityType) {
        scores[personalityType] = (scores[personalityType] || 0) + 1;
      }
    });

    // Find the personality type with the highest score
    let maxScore = 0;
    let resultType = "";
    
    Object.entries(scores).forEach(([type, score]) => {
      if (score > maxScore) {
        maxScore = score;
        resultType = type;
      }
    });

    setResult(resultType);
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