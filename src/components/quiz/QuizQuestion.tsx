"use client";

import React from "react";
import Image from "next/image";
import { useQuiz } from "./QuizContext";
import {
  QuizContainer,
  QuizHeader,
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
      
      <div className="w-full max-w-xs mx-auto sm:max-w-sm md:max-w-md">
        <div className="relative w-full h-0" style={{ paddingBottom: '100%' }}>
          <div className="absolute inset-0">
            <Image 
              src={`/Q${currentQuestion + 1}.png`}
              alt={`Question ${currentQuestion + 1} illustration`}
              fill
              sizes="(max-width: 768px) 100vw, 256px"
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
      
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