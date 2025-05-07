"use client";

import React from "react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export function QuizContainer({ children, className }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="min-h-[100dvh] bg-[#FCF3EC] flex items-center justify-center w-full text-[#FF5E29]">
      <div className={cn(
        "w-full h-full max-h-[800px] flex flex-col items-center px-4 py-8 overflow-y-auto",
        className
      )}>
        <div className="w-full max-w-[400px] flex flex-col gap-6 items-center justify-between flex-1 min-h-full">
          {children}
        </div>
      </div>
    </div>
  );
}

export function QuizHeader({ children, className }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 className={cn("font-sans font-bold text-lg h-24 flex flex-col items-center justify-center text-center w-full max-w-[400px]", className)}>
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
    <div className={cn("flex flex-col w-full max-w-[400px] gap-2", className)}>
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
      className={cn("bg-white text-[#FF5B34] rounded-lg p-3 flex items-center justify-center text-center font-medium text-sm hover:bg-[#FFDCD3] transition-colors cursor-pointer active:scale-95", className)}
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
    <div className={cn("w-full max-w-[400px] mt-3", className)}>
      <Progress value={value} className="h-2 [&>div]:bg-[#FF5E29]" />
      <p className="text-center mt-1 text-sm text-[#FF5E29]">
        Question {current} of {total}
      </p>
    </div>
  );
}

export function StartContainer({ children, className }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-between min-h-[100dvh] bg-[#FF5E29] text-white p-8 pb-safe overflow-y-auto",
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
  variant?: "start" | "result" | "quiz";
  className?: string;
  themeColor?: string;
}

export function QuizButton({ children, variant = "quiz", className, themeColor, ...props }: QuizButtonProps) {
  const defaultColor = "#FF5E29";
  const colorStyle = themeColor || defaultColor;
  
  return (
    <button
      className={cn(
        "rounded-lg p-4 font-bold text-center w-full transition-colors active:scale-95",
        variant === "quiz" && "bg-white text-[#FF5B34] hover:bg-[#FFDCD3]",
        variant === "start" && "bg-[#FCF3EC] text-[#FF5E29] hover:opacity-90",
        variant === "result" && "text-white hover:opacity-90",
        className
      )}
      style={
        variant === "result" 
          ? { backgroundColor: colorStyle }
          : undefined
      }
      {...props}
    >
      {children}
    </button>
  );
}

export function QuizResultContainer({
  children,
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-between min-h-[100dvh] bg-[#ff5e29] text-[#FCF3EC] pt-8 pb-safe px-4 overflow-y-auto",
        className
      )}
    >
      <div className="w-full max-w-[400px] flex flex-col items-center justify-between flex-1">
        {children}
      </div>
    </div>
  );
}