"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useQuiz } from "./QuizContext";
import { QuizButton } from "@/components/ui/quiz-ui";
import { Skeleton } from "@/components/ui/skeleton";

// Image mapping for each personality
const imageMapping: { [key: string]: string } = {
  "Big Bucks Bao": "/bao-optimised.png",
  Talkayaki: "/yaki-optimised.png",
  "Loco Taco": "/taco-optimised.png",
  "Flash Fry": "/fries-optimised.png",
  "Boba Babe": "/boba-optimised.png",
  Namastew: "/stew-optimised.png",
};

export const QuizResult: React.FC = () => {
  const { result, resetQuiz } = useQuiz();
  const [imageLoading, setImageLoading] = useState(true);

  if (!result) {
    return null;
  }

  const imageSrc = imageMapping[result] || "/fries-optimised.png";

  const handleBackToHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-[100dvh] bg-[#ff5e29] flex items-center justify-center w-full text-[#FCF3EC]">
      <div className="w-full h-full max-h-[800px] flex flex-col items-stretch gap-6 px-4 pt-6 pb-6 overflow-y-auto">
        {/* Header */}
        <div>
          <p className="text-base font-medium text-center font-poppins sm:text-lg">
            Feel free to share your result!
            <br />
            #Foodpersona
          </p>
        </div>

        {/* Image container - flexible height */}
        <div className="flex items-center justify-center flex-1 w-full min-h-0">
          <div
            className="relative w-full max-w-xs mx-auto sm:max-w-sm md:max-w-md"
            style={{
              maxHeight: "min(60vh, calc((800px - 250px)))",
              aspectRatio: "2/3",
            }}
          >
            {imageLoading && (
              <Skeleton className="absolute inset-0 rounded-lg" />
            )}
            <Image
              src={imageSrc}
              alt={`${result} food persona`}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 70vw"
              fill
              priority
              style={{ objectFit: "contain" }}
              onLoad={() => setImageLoading(false)}
            />
          </div>
        </div>

        {/* Buttons */}

        <div className="flex flex-col w-full gap-2 mx-auto sm:gap-3 max-w-32 sm:max-w-40">
          <QuizButton
            onClick={resetQuiz}
            variant="primary"
            className="w-full py-2 text-sm sm:py-3 sm:text-base"
          >
            Retake
          </QuizButton>

          <QuizButton
            variant="outline"
            onClick={handleBackToHome}
            className="w-full py-2 text-sm sm:py-3 sm:text-base"
          >
            Try the app
          </QuizButton>
        </div>
      </div>
    </div>
  );
};
