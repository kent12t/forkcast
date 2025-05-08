"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useQuiz } from "./QuizContext";
import { QuizButton } from "@/components/ui/quiz-ui";
import { Skeleton } from "@/components/ui/skeleton";

// Image mapping for each personality
const imageMapping: { [key: string]: string } = {
  "Big Bucks Bao": "/bao.png",
  Talkayaki: "/yaki.png",
  "Loco Taco": "/taco.png",
  "Flash Fry": "/fries.png",
  "Boba Babe": "/boba.png",
  Namastew: "/stew.png",
};

// Color mapping for each personality
const colorMapping: { [key: string]: string } = {
  "Big Bucks Bao": "#3F537F",
  "Talkayaki": "#E14410",
  "Loco Taco": "#E88F00",
  "Namastew": "#8E8E00",
  "Flash Fry": "#7A0009",
  "Boba Babe": "#E53E6E",
};

export const QuizResult: React.FC = () => {
  const { result, resetQuiz } = useQuiz();
  const [imageLoading, setImageLoading] = useState(true);

  if (!result) {
    return null;
  }

  const imageSrc = imageMapping[result] || "/fries-optimised.png";
  const themeColor = colorMapping[result] || "#FF5E29";

  const handleReturnHome = () => {
    resetQuiz();
  };

  const handleTryApp = () => {
    window.open(
      "https://www.figma.com/proto/HyddRt6BlffW73ZieNsV3i/Forkcast_Wireframe?page-id=0%3A1&node-id=687-8065&p=f&viewport=-11537%2C2270%2C0.48&t=PnC3bSz16Sj4bKA7-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=687%3A8065&show-proto-sidebar=1",
      "_blank"
    );
  };

  return (
    <div
      className="min-h-[100dvh] bg-[#FCF3EC] flex items-center justify-center w-full"
      style={{ color: themeColor }}
    >
      <div className="w-full h-full max-h-[800px] flex flex-col items-stretch gap-4 px-4 overflow-y-auto">
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
            onClick={handleReturnHome}
            variant="result"
            className="w-full py-2 text-sm sm:py-3 sm:text-base"
            themeColor={themeColor}
          >
            Return Home
          </QuizButton>

          <QuizButton
            variant="result"
            onClick={handleTryApp}
            className="w-full py-2 text-sm sm:py-3 sm:text-base"
            themeColor={themeColor}
          >
            Try the app
          </QuizButton>
        </div>
      </div>
    </div>
  );
};
