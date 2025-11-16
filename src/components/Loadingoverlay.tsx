import React from 'react';
import { motion } from 'framer-motion';
import { Languages } from 'lucide-react';

interface LoadingOverlayProps {
  progress: number;
  message?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ 
  progress, 
  message = 'Translating your CV...' 
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop Blur */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-md" />
      
      {/* Content */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative z-10 bg-white rounded-2xl shadow-2xl border-2 border-neutral-200 p-8 max-w-md w-full mx-4"
      >
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg"
          >
            <Languages className="text-white" size={32} />
          </motion.div>
        </div>

        {/* Message */}
        <h3 className="text-xl font-bold text-center text-neutral-800 mb-2">
          {message}
        </h3>
        <p className="text-sm text-center text-neutral-500 mb-6">
          Please wait while we process your content
        </p>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-neutral-600">
            <span className="font-medium">Progress</span>
            <span className="font-bold text-blue-600">{Math.round(progress)}%</span>
          </div>
          
          <div className="w-full h-3 bg-neutral-200 rounded-full overflow-hidden shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full relative overflow-hidden"
            >
              {/* Shimmer effect */}
              <motion.div
                animate={{ x: ['0%', '100%'] }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                style={{ width: '50%' }}
              />
            </motion.div>
          </div>
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                delay: i * 0.2 
              }}
              className="w-2 h-2 bg-blue-500 rounded-full"
            />
          ))}
        </div>

        {/* Tip */}
        <p className="text-xs text-center text-neutral-400 mt-6">
          💡 Tip: This may take a minute for longer CVs
        </p>
      </motion.div>
    </div>
  );
};

export default LoadingOverlay;