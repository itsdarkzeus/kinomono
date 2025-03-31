import React, { useEffect, useRef } from 'react';

interface ScrollAnimationProps {
  children: React.ReactNode;
  animation: 'fade-up' | 'fade-left' | 'fade-right' | 'scale' | 'stagger';
  className?: string;
  threshold?: number;
  rootMargin?: string;
}

const ScrollAnimation = ({ 
  children, 
  animation, 
  className = '', 
  threshold = 0.2,
  rootMargin = '0px'
}: ScrollAnimationProps) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [threshold, rootMargin]);

  const getAnimationClass = () => {
    switch (animation) {
      case 'fade-up':
        return 'scroll-fade-up';
      case 'fade-left':
        return 'scroll-fade-left';
      case 'fade-right':
        return 'scroll-fade-right';
      case 'scale':
        return 'scroll-scale';
      case 'stagger':
        return 'stagger-children';
      default:
        return '';
    }
  };

  return (
    <div ref={elementRef} className={`${getAnimationClass()} ${className}`}>
      {children}
    </div>
  );
};

export default ScrollAnimation;