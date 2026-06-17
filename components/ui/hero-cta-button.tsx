"use client";
import { PropsWithChildren, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

const GradientButton = ({ children }: PropsWithChildren) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Create motion values to track coordinates relative to button center
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);

  // Smooth the motion values using Motion springs
  const springX = useSpring(glowX, { stiffness: 150, damping: 15 });
  const springY = useSpring(glowY, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      glowX.set(x);
      glowY.set(y);
    }
  };

  const handleMouseLeave = () => {
    glowX.set(0);
    glowY.set(0);
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="cursor-pointer transition-all duration-200 uppercase font-bold flex items-center justify-center h-10 px-16 text-xs text-black -tracking-[0.015em] relative z-10 overflow-hidden rounded-full border border-white/60 bg-[#d1d1d1] space-x-1 sm:pl-[59px] sm:pr-[52px]"
    >
      <motion.div
        className="absolute -z-10 flex w-[204px] items-center justify-center pointer-events-none"
        style={{
          x: springX,
          y: springY,
        }}
      >
        <div className="absolute top-1/2 h-[121px] w-[121px] -translate-y-1/2 bg-[radial-gradient(50%_50%_at_50%_50%,#FFFFF5_3.5%,#3B82F6_26.5%,#60A5FA_37.5%,rgba(96,165,250,0.50)_49%,rgba(37,99,235,0.00)_92.5%)]" />
        <div className="absolute top-1/2 h-[103px] w-[204px] -translate-y-1/2 bg-[radial-gradient(43.3%_44.23%_at_50%_49.51%,#FFFFF7_29%,#93C5FD_48.5%,#BFDBFE_60.71%,rgba(99,152,245,0.00)_100%)] blur-[5px]" />
      </motion.div>
      {children}
    </motion.button>
  );
};

export default GradientButton;