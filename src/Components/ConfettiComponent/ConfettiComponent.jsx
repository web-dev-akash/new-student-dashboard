import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

export const ConfettiComponent = () => {
  const confettiRef = useRef(null);

  useEffect(() => {
    const canvas = confettiRef.current;
    if (canvas) {
      const myConfetti = confetti.create(canvas, {
        resize: true,
        useWorker: true,
      });

      myConfetti({
        particleCount: 100,
        spread: 160,
        origin: { x: 0.5, y: 0.5 },
      });
    }
  }, []);

  return (
    <canvas
      ref={confettiRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 99999,
      }}
    />
  );
};
