import React from "react";
import { motion } from "framer-motion";

const ModernSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-50/80 via-white/80 to-purple-50/80 backdrop-blur-md z-50">
      <motion.div
        className="relative flex items-center justify-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Outer rotating ring with gradient */}
        <motion.div
          className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 p-1"
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "linear",
          }}
        >
          <div className="w-full h-full rounded-full bg-white"></div>
        </motion.div>

        {/* Inner pulsing logo/icon */}
        <motion.div
          className="absolute flex items-center justify-center"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
          }}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
        </motion.div>
      </motion.div>

      {/* Loading text with dots animation */}
      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <motion.div className="text-neutral-800 text-lg font-semibold mb-2">
          Processing
          <motion.span
            className="inline-block"
            animate={{
              opacity: [0, 1, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut",
              times: [0, 0.5, 1],
            }}
          >
            ...
          </motion.span>
        </motion.div>
        <p className="text-sm text-neutral-500 font-medium">
          Please wait while we work on your CV
        </p>
      </motion.div>

      {/* Decorative floating elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full opacity-60"
        animate={{
          y: [0, -20, 0],
          opacity: [0.6, 0.3, 0.6],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-3 h-3 bg-purple-400 rounded-full opacity-50"
        animate={{
          y: [0, 20, 0],
          opacity: [0.5, 0.2, 0.5],
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
      <motion.div
        className="absolute bottom-1/3 left-1/3 w-2.5 h-2.5 bg-blue-300 rounded-full opacity-40"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.4, 0.2, 0.4],
        }}
        transition={{
          repeat: Infinity,
          duration: 3.5,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </div>
  );
};

export default ModernSpinner;