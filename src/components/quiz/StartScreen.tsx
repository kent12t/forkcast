"use client";

import React from "react";
import Image from "next/image";
import quizData from "@/data/quiz.json";
import {
  StartContainer,
  StartHeader,
  StartDescription,
  ButtonContainer,
  QuizButton,
  QuizImageContainer,
  QuizImageFrame
} from "@/components/ui/quiz-ui";

interface StartScreenProps {
  onStart: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <StartContainer>
      <header className="mt-8">
        <StartHeader>{quizData.title}</StartHeader>
        <StartDescription>
          {quizData.description}
        </StartDescription>
      </header>
      
      <div className="flex-1 flex items-center justify-center">
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
      </div>
      
      <ButtonContainer>
        <QuizButton 
          onClick={onStart}
          variant="primary"
        >
          Start
        </QuizButton>
        
        <QuizButton 
          variant="outline"
          onClick={() => {/* About page functionality */}}
        >
          About
        </QuizButton>
      </ButtonContainer>
    </StartContainer>
  );
}; 