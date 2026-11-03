"use client";

import { motion } from "framer-motion";

function DigitRoll({ digit, active, delay }: { digit: string; active: boolean; delay: number }) {
  const isDigit = digit >= "0" && digit <= "9";
  if (!isDigit) return <span className="odometer-static">{digit}</span>;

  const target = Number(digit);
  return (
    <span className="odometer-window" aria-hidden="true">
      <motion.span
        className="odometer-reel"
        initial={{ y: "0em" }}
        animate={{ y: active ? `-${20 + target}em` : "0em" }}
        transition={{ duration: 1.65, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {Array.from({ length: 30 }, (_, index) => <span key={index}>{index % 10}</span>)}
      </motion.span>
    </span>
  );
}

export function Odometer({ value, active, reducedMotion }: { value: string; active: boolean; reducedMotion: boolean }) {
  const numericPart = value.match(/^[\\d,]+/)?.[0] ?? "";
  const suffix = value.slice(numericPart.length);

  if (reducedMotion) return <span className="odometer-value">{numericPart}{suffix}</span>;

  return (
    <span className="odometer-value" role="img" aria-label={value}>
      {Array.from(numericPart).map((char, index) => (
        <DigitRoll key={`digit-${index}-${char}`} digit={char} active={active} delay={index * 0.075} />
      ))}
      {suffix && <span className="odometer-static">{suffix}</span>}
    </span>
  );
}
