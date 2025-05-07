"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useQuiz } from "./QuizContext";
import {
  QuizContainer,
  QuizHeader,
  QuizOptions,
  QuizOption,
  QuizProgressBar
} from "@/components/ui/quiz-ui";
import { Skeleton } from "@/components/ui/skeleton";

export const QuizQuestion: React.FC = () => {
  const { currentQuestion, quizData, isLoading, selectAnswer } = useQuiz();
  const [imageLoading, setImageLoading] = useState(true);
  
  // Preload next image
  useEffect(() => {
    if (!quizData) return;
    
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData.questions.length) {
      const img = new window.Image();
      img.src = `/Q${nextQuestion + 1}.png`;
    }
  }, [currentQuestion, quizData]);

  if (isLoading || !quizData) {
    return <QuizContainer>Loading quiz...</QuizContainer>;
  }

  const question = quizData.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizData.questions.length) * 100;

  return (
    <QuizContainer>
      {/* Header - fixed height, more compact */}
      <div className="flex-none w-full mb-1">
        <QuizHeader>{question.text}</QuizHeader>
      </div>
      
      {/* Image container - even more flexible height */}
      <div className="flex items-center justify-center w-full min-h-0 my-1" style={{ flex: '0.6' }}>
        <div className="relative w-full max-w-xs mx-auto sm:max-w-sm md:max-w-md" style={{ 
          maxHeight: 'min(35vh, calc((100dvh - 450px)))',
          aspectRatio: '1/1'
        }}>
          {imageLoading && (
            <Skeleton className="absolute inset-0 rounded-lg" />
          )}
          <Image 
            src={`/Q${currentQuestion + 1}.png`}
            alt={`Question ${currentQuestion + 1} illustration`}
            fill
            sizes="(max-width: 768px) 100vw, 256px"
            className="object-contain"
            priority
            onLoad={() => setImageLoading(false)}
          />
        </div>
      </div>
      
      {/* Options and Progress - fixed height, more compact */}
      <div className="flex-none w-full mt-1">
        <QuizOptions>
          {question.options.map((option) => (
            <QuizOption
              key={option.id}
              onClick={() => selectAnswer(question.id, option)}
              className="h-20" // Make options more compact
            >
              {option.text}
            </QuizOption>
          ))}
        </QuizOptions>
        
        <QuizProgressBar 
          value={progress} 
          current={currentQuestion + 1} 
          total={quizData.questions.length} 
          className="mt-8"
        />
      </div>
    </QuizContainer>
  );
}; 