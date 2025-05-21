"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import quizData from "@/data/quiz.json";
import {
  QuizButton,
} from "@/components/ui/quiz-ui";
import { Skeleton } from "@/components/ui/skeleton";

interface StartScreenProps {
  onStart: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const router = useRouter();

  // Preload all quiz images
  useEffect(() => {
    if (quizData && quizData.questions) {
      quizData.questions.forEach((question) => {
        // Assuming question images are named Q1.png, Q2.png, etc.
        // and question.id might not be sequential or 1-indexed.
        // Using index + 1 if IDs are not reliable for image naming.
        // If question.id *is* the image number, use that instead.
        const img = new window.Image();
        // The search result for QuizQuestion.tsx showed img.src = `/Q${nextQuestion + 1}.png`;
        // where nextQuestion was currentQuestion + 1. currentQuestion is 0-indexed.
        // So, for question 1, it's Q1.png.
        // Assuming quizData.questions is 0-indexed and questions have an 'id' that is 1-indexed for the image.
        img.src = `/Q${question.id}.png`; 
      });
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="min-h-[100dvh] bg-[#FF5E29] flex items-center justify-center w-full text-[#ECDFD4]">
      <div className="w-full h-full max-h-[800px] flex flex-col items-stretch gap-6 px-4 pt-6 pb-6 overflow-y-auto">
        {/* Header */}
        <div>
          <h1 className="text-center font-sans font-bold text-3xl sm:text-4xl md:text-5xl max-w-[400px] mx-auto">
            {quizData.title}
          </h1>
          <p className="text-center mt-2 font-medium max-w-[400px] mx-auto text-sm sm:text-base">
            {quizData.description}
          </p>
        </div>

        {/* Image container - flexible height */}
        <div className="flex items-center justify-center flex-1 w-full min-h-0">
          <div className="relative w-full max-w-xs mx-auto sm:max-w-sm md:max-w-md" style={{ 
            maxHeight: 'min(50vh, calc((800px - 300px)))',
            aspectRatio: '1/1'
          }}>
            {imageLoading && (
              <Skeleton className="absolute inset-0 rounded-lg" />
            )}
            <Image
              src="/start-page.png"
              alt="Quiz start page illustration"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 70vw"
              className="object-contain"
              priority
              onLoad={() => setImageLoading(false)}
            />
          </div>
        </div>

        {/* Buttons */}
        <div>
          <div className="flex flex-col w-full gap-2 mx-auto sm:gap-3 max-w-32 sm:max-w-40">
            <QuizButton
              onClick={onStart}
              variant="start"
              className="w-full py-2 text-sm sm:py-3 sm:text-base"
            >
              Start
            </QuizButton>

            <QuizButton
              variant="start"
              onClick={() => router.push("/about")}
              className="w-full py-2 text-sm sm:py-3 sm:text-base"
            >
              About
            </QuizButton>
          </div>
        </div>
      </div>
    </div>
  );
}; 