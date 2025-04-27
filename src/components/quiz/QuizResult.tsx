"use client";

import React from "react";
import Image from "next/image";
import { useQuiz } from "./QuizContext";
import {
  QuizContainer,
  QuizHeader,
  QuizImageContainer,
  QuizImageFrame,
  QuizButton
} from "@/components/ui/quiz-ui";

// Results data with descriptions for each personality
const resultDescriptions: { [key: string]: { description: string } } = {
  "Big Bucks Bun": {
    description: "You're a savvy foodie who knows how to get the best value! You appreciate good deals and love to share your food finds with others."
  },
  "Yappy Sushi": {
    description: "Social dining is your thing! You love sharing meals with friends and family, and food experiences are about the connections you make."
  },
  "Loco Taco": {
    description: "You're always on the hunt for new and exciting flavors! Adventure and novelty drive your food choices and you're the first to try something unusual."
  },
  "Flash Fry": {
    description: "Efficiency is your middle name! You value quick, convenient food that fuels your busy lifestyle without slowing you down."
  },
  "Boba Babe": {
    description: "Food is your comfort zone! Sweet treats and familiar flavors help you feel at home, and you're not afraid to indulge when needed."
  },
  "Steamy Sage": {
    description: "You're mindful about your food choices and appreciate the ritual of eating. You take time to savor flavors and enjoy each bite."
  }
};

export const QuizResult: React.FC = () => {
  const { result, resetQuiz } = useQuiz();
  
  if (!result) {
    return null;
  }
  
  const resultData = resultDescriptions[result] || {
    description: "You have a unique food personality!"
  };

  return (
    <QuizContainer>
      <QuizHeader>Your Food Persona is...</QuizHeader>
      
      <h1 className="text-3xl font-bold my-4 text-center max-w-[400px] w-full">{result}</h1>
      
      <QuizImageContainer>
        <QuizImageFrame>
          <Image 
            src="/fries.png" 
            alt={`${result} food persona`}
            width={200}
            height={200}
            className="object-contain"
          />
        </QuizImageFrame>
      </QuizImageContainer>
      
      <p className="text-center my-6 max-w-[400px] w-full">
        {resultData.description}
      </p>
      
      <div className="mt-8 w-full max-w-[400px]">
        <QuizButton 
          onClick={resetQuiz}
          variant="primary"
          className="w-full"
        >
          Take Quiz Again
        </QuizButton>
      </div>
      
      <div className="mt-4 w-full max-w-[400px]">
        <QuizButton 
          variant="outline"
          onClick={() => window.location.href = "/"}
          className="w-full"
        >
          Back to Home
        </QuizButton>
      </div>
    </QuizContainer>
  );
}; 