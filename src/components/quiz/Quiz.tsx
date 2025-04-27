"use client";

import React, { useState } from "react";
import { QuizProvider, useQuiz } from "./QuizContext";
import { StartScreen } from "./StartScreen";
import { QuizQuestion } from "./QuizQuestion";
import { QuizResult } from "./QuizResult";
import { AnimatePresence, motion } from "framer-motion";

const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

const QuizContent: React.FC = () => {
  const [showStart, setShowStart] = useState(true);
  const { isComplete } = useQuiz();

  const handleStartQuiz = () => {
    setShowStart(false);
  };

  return (
    <AnimatePresence mode="wait">
      {showStart && (
        <motion.div
          key="start-screen"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={fadeVariants}
        >
          <StartScreen onStart={handleStartQuiz} />
        </motion.div>
      )}
      
      {!showStart && !isComplete && (
        <motion.div
          key="question-screen"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={fadeVariants}
        >
          <QuizQuestion />
        </motion.div>
      )}
      
      {!showStart && isComplete && (
        <motion.div
          key="result-screen"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={fadeVariants}
        >
          <QuizResult />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const Quiz: React.FC = () => {
  return (
    <QuizProvider>
      <QuizContent />
    </QuizProvider>
  );
}; 