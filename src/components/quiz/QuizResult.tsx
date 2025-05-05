"use client";

import React from "react";
import Image from "next/image";
import { useQuiz } from "./QuizContext";
import {
  QuizButton,
} from "@/components/ui/quiz-ui";

// Image mapping for each personality
const imageMapping: { [key: string]: string } = {
  "Big Bucks Bao": "/bao-optimised.png",
  "Talkayaki": "/yaki-optimised.png",
  "Loco Taco": "/taco-optimised.png",
  "Flash Fry": "/fries-optimised.png",
  "Boba Babe": "/boba-optimised.png",
  "Namastew": "/stew-optimised.png",
};

export const QuizResult: React.FC = () => {
  const { result, resetQuiz } = useQuiz();

  if (!result) {
    return null;
  }

  const imageSrc = imageMapping[result] || "/fries-optimised.png";

  const handleBackToHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="flex flex-col items-stretch min-h-screen bg-[#ff5e29] text-[#FCF3EC] px-4 overflow-hidden">
      {/* Top aligned header */}
      <div className="pt-6">
        <p className="text-center font-medium font-poppins text-base sm:text-lg">
          Feel free to share your result!<br />
          #Foodpersona
        </p>
      </div>
      
      {/* Middle flex container for image */}
      <div className="flex-1 flex items-center justify-center w-full px-4 py-4">
        <div className="w-full mx-auto">
          <div className="relative w-full h-0" style={{ paddingBottom: '150%' }}>
            <div className="absolute inset-0">
              <Image
                src={imageSrc}
                alt={`${result} food persona`}
                sizes="(max-width: 640px) 100vw"
                fill
                priority
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom aligned buttons */}
      <div className="pb-4">
        <div className="flex flex-col gap-2 w-full max-w-32 sm:max-w-36 mx-auto">
          <QuizButton 
            onClick={resetQuiz} 
            variant="primary" 
            className="w-full py-2 text-sm sm:text-base"
          >
            Retake
          </QuizButton>

          <QuizButton
            variant="outline"
            onClick={handleBackToHome}
            className="w-full py-2 text-sm sm:text-base"
          >
            Try the app
          </QuizButton>
        </div>
      </div>
    </div>
  );
};
