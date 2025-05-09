"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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

  const handleShare = async () => {
    try {
      // Fetch the image and convert it to a blob
      const response = await fetch(imageSrc);
      const blob = await response.blob();
      const file = new File([blob], 'foodpersona.png', { type: blob.type });

      if (navigator.share && navigator.canShare) {
        const shareData = {
          title: 'My Foodpersona Result',
          text: `I'm a ${result}! Find out your food personality at Forkcast! #Foodpersona`,
          url: window.location.href,
          files: [file]
        };

        if (navigator.canShare(shareData)) {
          await navigator.share(shareData);
        } else {
          // Fallback to sharing without image if files are not supported
          await navigator.share({
            title: 'My Foodpersona Result',
            text: `I'm a ${result}! Find out your food personality at Forkcast! #Foodpersona`,
            url: window.location.href,
          });
        }
      } else {
        console.log('Web Share API not supported');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      // Fallback to basic share if image sharing fails
      try {
        if (navigator.share) {
          await navigator.share({
            title: 'My Foodpersona Result',
            text: `I'm a ${result}! Find out your food personality at Forkcast! #Foodpersona`,
            url: window.location.href,
          });
        }
      } catch (fallbackError) {
        console.error('Fallback sharing failed:', fallbackError);
      }
    }
  };

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
        <div className="flex flex-col w-4/5 gap-2 mx-auto sm:gap-3 max-w-96">
          <QuizButton
            onClick={handleShare}
            variant="result"
            className="w-full py-2 text-sm sm:py-3 sm:text-base"
            themeColor={themeColor}
          >
            Share
          </QuizButton>

          <div className="flex gap-2 sm:gap-3">
            <QuizButton
              onClick={handleReturnHome}
              variant="result"
              className="flex-1 py-2 text-sm sm:py-3 sm:text-base"
              themeColor={themeColor}
            >
              Return Home
            </QuizButton>

            <QuizButton
              variant="result"
              onClick={handleTryApp}
              className="flex-1 py-2 text-sm sm:py-3 sm:text-base"
              themeColor={themeColor}
            >
              Try the app
            </QuizButton>
          </div>
        </div>

        {/* Attribution */}
        <div className="pt-4 mb-4 text-xs text-center" style={{ color: themeColor }}>
          Designed by{" "}
          <Link
            href="https://www.instagram.com/viviantxh"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            @viviantxh
          </Link>{" "}
          and developed by{" "}
          <Link
            href="https://github.com/kent12t"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Kent
          </Link>
        </div>
      </div>
    </div>
  );
};
