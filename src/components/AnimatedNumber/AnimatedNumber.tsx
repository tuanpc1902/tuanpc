import { useEffect, useState, useRef } from 'react';

interface AnimatedNumberProps {
  value: string;
  duration?: number;
  className?: string;
}

/**
 * Component to animate number changes with counting effect
 */
function AnimatedNumber({ value, duration = 800, className = '' }: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const [isAnimating, setIsAnimating] = useState(false);
  const previousValueRef = useRef(value);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const numValue = parseInt(value, 10);
    const prevNumValue = parseInt(previousValueRef.current, 10);

    if (isNaN(numValue) || isNaN(prevNumValue) || numValue === prevNumValue) {
      setDisplayValue(value);
      previousValueRef.current = value;
      return;
    }

    setIsAnimating(true);
    const startValue = prevNumValue;
    const endValue = numValue;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(startValue + (endValue - startValue) * easeOut);

      setDisplayValue(String(currentValue));

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
        setIsAnimating(false);
        previousValueRef.current = value;
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [value, duration]);

  return (
    <span className={className} data-animating={isAnimating}>
      {displayValue}
    </span>
  );
}

export default AnimatedNumber;
