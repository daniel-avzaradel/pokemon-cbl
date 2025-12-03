import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

// --- Smoke puff keyframes ---
const puffAnim = keyframes`
  0% { transform: scale(0.2); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.8; }
  100% { transform: scale(2); opacity: 0; }
`;

// --- Spark (star) keyframes ---
const sparkAnim = keyframes`
  0% { transform: scale(0); opacity: 1; }
  50% { transform: scale(1); opacity: 0.8; }
  100% { transform: scale(1.5); opacity: 0; }
`;

// --- Container for poof ---
const PoofWrapper = styled.div`
  position: absolute;
  width: 250px;
  height: 250px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 999;
  transition: 1s ease-in-out;

  .puff {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 1) 0%,
      rgba(220, 220, 220, 0.8) 30%,
      rgba(180, 180, 180, 0.5) 60%,
      rgba(120, 120, 120, 0.2) 80%,
      rgba(0,0,0,0) 100%
    );
    animation: ${puffAnim} 1.4s ease-in-out forwards;
  }

  .puff:nth-child(2) {
    left: -30px;
    top: -15px;
    animation-delay: 0.05s;
  }

  .puff:nth-child(3) {
    left: 30px;
    top: 10px;
    animation-delay: 0.1s;
  }

  .spark {
    position: absolute;
    width: 20px;
    height: 20px;
    background: yellow;
    clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
    animation: ${sparkAnim} 1.6s ease-out forwards;
  }

  .spark:nth-child(4) {
    left: 60px;
    top: 30px;
    animation-delay: 0.1s;
  }

  .spark:nth-child(5) {
    left: 180px;
    top: -40px;
    animation-delay: 0.15s;
  }
`;

export const PokemonPoof: React.FC<{ show?: boolean; onComplete?: () => void }> = ({
  show = true,
  onComplete,
}) => {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setVisible(false);
        if (onComplete) onComplete();
      }, 800); // matches longest animation
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!visible) return null;

  return (
    <PoofWrapper>
      {/* Smoke clouds */}
      <div className="puff" />
      <div className="puff" />
      <div className="puff" />

      {/* Spark stars */}
      <div className="spark" />
      <div className="spark" />
    </PoofWrapper>
  );
};