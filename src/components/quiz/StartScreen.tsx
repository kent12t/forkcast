"use client";

import React from "react";
import Image from "next/image";
import quizData from "@/data/quiz.json";
import {
  QuizButton,
} from "@/components/ui/quiz-ui";

interface StartScreenProps {
  onStart: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-stretch min-h-[100dvh] h-[100dvh] bg-[#FF5E29] text-white px-4 pt-4 sm:pt-8 md:pt-12 pb-6 sm:pb-8 md:pb-12 overflow-hidden">
      {/* Top aligned header */}
      <div>
        <h1 className="text-center font-sans font-bold text-3xl sm:text-4xl max-w-[400px] mx-auto">
          {quizData.title}
        </h1>
        <p className="text-center mt-2 font-medium max-w-[400px] mx-auto">
          {quizData.description}
        </p>
      </div>
      
      {/* Middle flex container for image - use flex-grow to take available space */}
      <div className="flex-grow flex items-center justify-center w-full px-4 py-2 sm:py-4">
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
          <div className="relative w-full h-0" style={{ paddingBottom: '100%' }}> {/* 1:1 aspect ratio */}
            <div className="absolute inset-0">
              <Image 
                src="/cabin.png" 
                alt="Cookie cabin in the clouds"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 70vw"
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom aligned buttons */}
      <div className="mt-auto pb-safe">
        <div className="flex flex-col gap-2 sm:gap-3 w-full max-w-32 sm:max-w-40 mx-auto">
          <QuizButton 
            onClick={onStart}
            variant="primary" 
            className="w-full py-2 sm:py-3.5 text-sm sm:text-base"
          >
            Start
          </QuizButton>

          <QuizButton
            variant="outline"
            onClick={() => {/* About page functionality */}}
            className="w-full py-2 sm:py-3.5 text-sm sm:text-base"
          >
            About
          </QuizButton>
        </div>
      </div>
    </div>
  );
}; 