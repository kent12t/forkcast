"use client";

import React, { useState } from "react";
import { QuizProvider, useQuiz } from "./QuizContext";
import { StartScreen } from "./StartScreen";
import { QuizQuestion } from "./QuizQuestion";
import { QuizResult } from "./QuizResult";

const QuizContent: React.FC = () => {
  const [showStart, setShowStart] = useState(true);
  const { isComplete } = useQuiz();

  const handleStartQuiz = () => {
    setShowStart(false);
  };

  if (showStart) {
    return <StartScreen onStart={handleStartQuiz} />;
  }

  if (isComplete) {
    return <QuizResult />;
  }

  return <QuizQuestion />;
};

export const Quiz: React.FC = () => {
  return (
    <QuizProvider>
      <QuizContent />
    </QuizProvider>
  );
}; 