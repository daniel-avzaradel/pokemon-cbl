// CoinFlipOverlay.tsx
import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

type CoinSide = "heads" | "tails";

interface CoinFlipOverlayProps {
  size?: number;
  frontImage: string;
  backImage: string;
  show: boolean;
  onResult?: (side: CoinSide) => void;
  onClose?: () => void;
}

export const CoinFlipOverlay: React.FC<CoinFlipOverlayProps> = ({
  size = 200,
  frontImage,
  backImage,
  show,
  onResult,
  onClose,
}) => {
  const [flipping, setFlipping] = useState(false);
  const [side, setSide] = useState<CoinSide | null>(null);
  const [rotation, setRotation] = useState(0);

  if (!show) return null;

  const flipCoin = () => {
  if (flipping || side !== null) return; // <-- ignore clicks while flipping or result showing

  setFlipping(true);
  setSide(null);

  const random = Math.random();
  const result: CoinSide = random <= 0.5 ? "heads" : "tails";
  const spins = 6;
  const finalRotation = result === "heads" ? 360 * spins : 360 * spins + 180;

  setRotation(finalRotation);

  const animationDuration = 2000;

  setTimeout(() => {
    setFlipping(false);
    setSide(result);

    // Wait 1 second to show final result
    setTimeout(() => {
      if (onResult) onResult(result);
      if (onClose) onClose();
    }, 1000);
  }, animationDuration);
};

  return (
    <Overlay onClick={flipCoin}>
      <CoinWrapper
        size={size}
        style={{ transform: `rotateY(${rotation}deg)` }}
      >
        <CoinFace className="front">
          <img src={frontImage} alt="Heads" />
        </CoinFace>
        <CoinFace className="back" $backImage={backImage} />
      </CoinWrapper>
    </Overlay>
  );
};

// ---------------------------
// Styled Components
// ---------------------------

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  cursor: pointer;
`;

const CoinWrapper = styled.div<{ size?: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  perspective: 1000px;
  transform-style: preserve-3d;
  position: relative;
  transition: transform 2s ease-out;
`;

const CoinFace = styled.div<{ $backImage?: string }>`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  backface-visibility: hidden;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  &.front {
    transform: rotateY(0deg);
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &.back {
    transform: rotateY(180deg); /* always 180deg */
    background: goldenrod;
    border: 4px solid #222;
    background-image: url(${(p) => p.$backImage});
    background-size: cover;
    background-position: center;
  }
`;
