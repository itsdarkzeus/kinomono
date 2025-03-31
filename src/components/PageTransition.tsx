import React from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          initial={{ 
            clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)',
            filter: 'hue-rotate(90deg) contrast(150%)'
          }}
          animate={{ 
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            filter: 'hue-rotate(0deg) contrast(100%)'
          }}
          exit={{ 
            clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
            filter: 'hue-rotate(-90deg) contrast(150%)'
          }}
          transition={{
            duration: 0.8,
            ease: [0.43, 0.13, 0.23, 0.96]
          }}
        >
          <motion.div
            initial={{ scale: 0.9, filter: 'blur(10px)' }}
            animate={{ scale: 1, filter: 'blur(0px)' }}
            exit={{ scale: 0.9, filter: 'blur(10px)' }}
            transition={{
              duration: 0.5,
              ease: [0.43, 0.13, 0.23, 0.96]
            }}
          >
            {children}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Animated Background Grid */}
      <div className="fixed inset-0 -z-10 grid grid-cols-[repeat(auto-fill,minmax(60px,1fr))] grid-rows-[repeat(auto-fill,minmax(60px,1fr))] opacity-[0.02]">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="border border-white/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: i * 0.01,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default PageTransition;