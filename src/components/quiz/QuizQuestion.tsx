"use client";

import React from "react";
import Image from "next/image";
import { useQuiz } from "./QuizContext";
import {
  QuizContainer,
  QuizHeader,
  QuizImageContainer,
  QuizImageFrame,
  QuizOptions,
  QuizOption,
  QuizProgressBar
} from "@/components/ui/quiz-ui";

export const QuizQuestion: React.FC = () => {
  const { currentQuestion, quizData, isLoading, selectAnswer } = useQuiz();
  
  if (isLoading || !quizData) {
    return <QuizContainer>Loading quiz...</QuizContainer>;
  }

  const question = quizData.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizData.questions.length) * 100;

  return (
    <QuizContainer>
      <QuizHeader>{question.text}</QuizHeader>
      
      <QuizImageContainer>
        <QuizImageFrame className="h-64 w-64 relative">
          <Image 
            src="/cabin.png" 
            alt="Cookie cabin in the clouds"
            fill
            sizes="(max-width: 768px) 100vw, 256px"
            className="object-contain"
            priority
          />
        </QuizImageFrame>
      </QuizImageContainer>
      
      <QuizOptions>
        {question.options.map((option) => (
          <QuizOption
            key={option.id}
            onClick={() => selectAnswer(question.id, option)}
          >
            {option.text}
          </QuizOption>
        ))}
      </QuizOptions>
      
      <QuizProgressBar 
        value={progress} 
        current={currentQuestion + 1} 
        total={quizData.questions.length} 
      />
    </QuizContainer>
  );
}; 