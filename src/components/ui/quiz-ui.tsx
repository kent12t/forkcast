"use client";

import React from "react";
import { Button as ShadcnButton } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export function QuizContainer({ children, className }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-between min-h-screen bg-[#FCF3EC] text-[#FF5E29] pt-8 pb-12 px-4 overflow-hidden",
        className
      )}
    >
      <div className="w-full max-w-[400px] flex flex-col items-center justify-between flex-1">
        {children}
      </div>
    </div>
  );
}

export function QuizHeader({ children, className }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 className={cn("font-sans font-bold text-lg h-32 flex items-center justify-center text-center w-full max-w-[400px]", className)}>
      {children}
    </h2>
  );
}

export function QuizImageContainer({ children, className }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-[400px] flex items-center justify-center my-6", className)}>
      {children}
    </div>
  );
}

export function QuizImageFrame({ children, className }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-64 h-64 bg-white/10 rounded-lg flex items-center justify-center", className)}>
      {children}
    </div>
  );
}

export function QuizOptions({ children, className }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col w-full max-w-[400px] gap-4 mt-6", className)}>
      {children}
    </div>
  );
}

interface QuizOptionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export function QuizOption({ children, className, ...props }: QuizOptionProps) {
  return (
    <button
      className={cn("bg-white text-[#FF5B34] rounded-lg p-5 h-24 flex items-center justify-center text-center font-medium text-sm hover:bg-[#FFDCD3] transition-colors cursor-pointer", className)}
      {...props}
    >
      {children}
    </button>
  );
}

interface QuizProgressBarProps {
  value: number;
  current: number;
  total: number;
  className?: string;
}

export function QuizProgressBar({ value, current, total, className }: QuizProgressBarProps) {
  return (
    <div className={cn("w-full max-w-[400px] mt-6", className)}>
      <Progress value={value} className="h-2 [&>div]:bg-[#FF5E29]" />
      <p className="text-center mt-2 text-sm">
        Question {current} of {total}
      </p>
    </div>
  );
}

export function StartContainer({ children, className }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-between min-h-screen bg-[#FF5E29] text-white p-8",
        className
      )}
    >
      <div className="w-full max-w-[400px] flex flex-col items-center justify-between flex-1">
        {children}
      </div>
    </div>
  );
}

export function StartHeader({ children, className }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1 className={cn("font-sans font-bold text-4xl text-center w-full max-w-[400px]", className)}>
      {children}
    </h1>
  );
}

export function StartDescription({ children, className }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-center mt-4 font-medium w-full max-w-[400px]", className)}>
      {children}
    </p>
  );
}

export function ButtonContainer({ children, className }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-row gap-4 w-full max-w-[400px]", className)}>
      {children}
    </div>
  );
}

interface QuizButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
  className?: string;
}

export function QuizButton({ children, variant = "primary", className, ...props }: QuizButtonProps) {
  return (
    <ShadcnButton
      className={cn(
        "rounded-lg p-4 font-bold text-center flex-1 transition-colors",
        variant === "primary" 
          ? "bg-white text-[#FF5B34] hover:bg-[#FFDCD3]" 
          : "bg-white/20 text-white border-white",
        className
      )}
      variant={variant === "primary" ? "default" : "outline"}
      {...props}
    >
      {children}
    </ShadcnButton>
  );
} 