"use client";

import React from "react";
import Image from "next/image";
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
        <StartHeader>Food Persona</StartHeader>
        <StartDescription>
          Whisk away to a cloud-top world of snacks and surprises where cravings lead and your food persona awaits!
        </StartDescription>
      </header>
      
      <div className="flex-1 flex items-center justify-center">
        <QuizImageContainer>
          <QuizImageFrame>
            <Image 
              src="/fries.png" 
              alt="Food Persona mascot"
              width={200}
              height={200}
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