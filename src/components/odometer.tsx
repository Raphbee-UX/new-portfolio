"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

function DigitRoll({ digit, active, delay }: { digit: string; active: boolean; delay: number }) {
  if (!/\\d/.test(digit)) return <span className="odometer-static">{digit}</span>;
  const target = Number(digit);
  return (
    <span className="odometer-window" aria-hidden="true">
      <motion.span
        className="odometer-reel"
        initial={{ y: "0em" }}
        animate={{ y: active ? `-${20 + target}em` : "0em" }}
        transition={{ duration: 1.55, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {Array.from({ length: 30 }, (_, i) => <span key={i}>{i % 10}</span>)}
      </motion.span>
    </span>
  );
}

export function Odometer({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.45 });
  const reducedMotion = useReducedMotion();
  const active = reducedMotion ? true : inView;

  return (
    <span ref={ref} className="odometer-value" aria-label={value}>
      <span className="sr-only">{value}</span>
      {Array.from(value).map((char, index) => (
        <DigitRoll key={index} digit={char} active={active} delay={index * 0.055} />
      ))}
    </span>
  );
}
