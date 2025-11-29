import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const Header = styled.div`
  h2 {
    color: white;
    font-size: 1.875rem;
    margin-bottom: 0.5rem;
  }

  p {
    color: #9ca3af;
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const PacksGrid = styled.div`
  display: grid;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const PackCard = styled.div<{$type?: string, $delay: number, $show: boolean}>`
  background: ${props => props.$type || 'linear-gradient(to bottom right, #d6d6d6ff, #1b1b1bff, #585858ff)'};
  backdrop-filter: blur(12px);
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid #2a2a2a;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  opacity: 0;
  transform: translateX(50px);
  animation: ${({ $show }) => ($show ? slideIn : 'none')} 0.5s forwards;
  animation-delay: ${({ $delay }) => $delay || 0}s;

  &:hover {
    border-color: rgba(202, 138, 4, 0.5);
  }
`;

export const PackContent = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const IconWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 5rem;
  height: 5rem;
  background: linear-gradient(to bottom right, #7f1d1d, #450a0a);
  border-radius: 0.75rem;
  border: 2px solid rgba(202, 138, 4, 0.3);
  margin: 0 auto;
`;

export const PackInfo = styled.div`
  h3 {
    color: #111;
    font-weight: 700;
    font-size: 1.25rem;
    margin-bottom: 0.25rem;
  }

  p {
    color: #111;
    font-size: 0.9375rem;
  }
`;

export const PriceBox = styled.div`
  background: #252525ff;
  border-radius: 0.5rem;
  padding: 0.75rem;
  border: 1px solid #3d3d3dff;

  .price {
    color: #eab308;
    font-size: 1.875rem;
  }

  .label {
    color: #9ca3af;
    font-size: 0.875rem;
  }
`;

export const PurchaseButton = styled.button<{ $disabled: boolean }>`
  width: 100%;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: ${props => props.$disabled ? '1px solid #404040' : '1px solid rgba(202, 138, 4, 0.3)'};
  background: ${props => props.$disabled ? '#262626' : 'linear-gradient(to right, #7f1d1d, #450a0a)'};
  color: ${props => props.$disabled ? '#737373' : 'white'};
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.$disabled ? '#262626' : 'linear-gradient(to right, #991b1b, #7f1d1d)'};
    transform: ${props => props.$disabled ? 'none' : 'scale(1.05)'};
  }
`;

export const Modal = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding: 1rem;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  & > img {
    animation: spin 1s linear infinite;
  }
`;

export const ModalContent = styled.div`
  position: absolute;
  max-width: 1280px;
  padding: 1rem;
  box-sizing: border-box;
  width: 100%;
`;

export const ModalHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  box-sizing: border-box;
`;

export const ModalTitle = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #eab308;
  font-size: 1.5rem;
  box-sizing: border-box;
`;

export const CardsGrid = styled.div<{$cards: number}>`
  display: grid;
  place-content: center;
  grid-template-columns: ${p => p.$cards > 4 ? `repeat(3, min(220px))` : `repeat(${p.$cards}, 1fr)`};
  max-width: ${p => p.$cards >= 4 ? `1280px` : `768px`};
  margin: auto;
  place-items: center;
  justify-items: center;
  align-items: center;
  gap: 1rem;
  box-sizing: border-box;

  & > * {
    height: 100%;
  }
`;

export const CardWrapper = styled.div<{ $delay: number }>`
  display: flex;
  animation: fadeIn 0.5s ease-in-out;
  animation-delay: ${props => props.$delay}s;
  animation-fill-mode: backwards;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const ContinueButton = styled.button<{ $delay: number }>`
  background: linear-gradient(to right, #7f1d1d, #450a0a);
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(202, 138, 4, 0.3);
  cursor: pointer;
  transition: all 0.5s ease;
  animation: fadeIn 0.5s ease-in-out;
  animation-fill-mode: backwards;
  margin-top: 2rem;

  animation-delay: ${props => props.$delay}s;
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  &:hover {
    background: linear-gradient(to right, #991b1b, #7f1d1d);
  }
`;

export const ButtonContainer = styled.div`
  text-align: center;
`;