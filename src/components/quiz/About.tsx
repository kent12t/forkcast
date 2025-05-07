"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { QuizButton } from "@/components/ui/quiz-ui";
import { Skeleton } from "@/components/ui/skeleton";

const imageMapping: { [key: string]: string } = {
  "Big Bucks Bao": "/bao.png",
  Talkayaki: "/yaki.png",
  "Loco Taco": "/taco.png",
  "Flash Fry": "/fries.png",
  "Boba Babe": "/boba.png",
  Namastew: "/stew.png",
};

const priorityOrder = [
  "Flash Fry",
  "Big Bucks Bao",
  "Loco Taco",
  "Talkayaki",
  "Namastew",
  "Boba Babe",
];

export const About = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);

  return (
    <div className="min-h-[100dvh] bg-[#FF5E29] flex items-center justify-center w-full text-[#ECDFD4]">
      <div className="w-full h-full max-w-4xl flex flex-col items-stretch gap-8 px-4 pt-6 pb-6 overflow-y-auto">
        {/* Header */}
        <div>
          <h1 className="text-center font-sans font-bold text-3xl sm:text-4xl md:text-5xl">
            ABOUT
          </h1>
          <p className="text-center mt-4 font-medium max-w-[600px] mx-auto text-sm sm:text-base">
            Your Food Persona is the real MVP behind every &ldquo;what should I eat?&rdquo; meltdown. 
            Complete this quiz to find out your flavor profile and quirks. From there, Forkcast 
            dishes out a daily Flavor Forecast tailored to your cravings, mood, and main 
            character energy.
          </p>
        </div>

        {/* All Personas Section */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
            All personas
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {priorityOrder.map((name) => (
              <div key={name} className="flex flex-col items-center bg-white/10 rounded-lg p-4">
                <div className="relative w-full aspect-square">
                  {loading && <Skeleton className="absolute inset-0 rounded-lg" />}
                  <Image
                    src={imageMapping[name]}
                    alt={name}
                    fill
                    className="object-contain"
                    onLoad={() => setLoading(false)}
                  />
                </div>
                <h3 className="mt-2 text-lg font-bold">{name}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Back Button */}
        <div className="flex justify-center mt-4">
          <QuizButton
            variant="start"
            onClick={() => router.back()}
            className="w-32 py-2 text-sm sm:py-3 sm:text-base"
          >
            Back
          </QuizButton>
        </div>
      </div>
    </div>
  );
}; 