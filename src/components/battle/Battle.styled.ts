import styled, { keyframes } from "styled-components";

export const BattleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: .5rem;
  color: white;
`;

export const BattleHeader = styled.div`
  h1 {
    color: white;
    font-size: 1.875rem;
    margin-bottom: 0.5rem;
  }

  p {
    color: #9ca3af;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-size: 1.8rem;
  & > svg {
    margin: 0;
    filter: drop-shadow(0px 2px 2px rgba(255, 255, 255, 0.9));
  }
`

export const LevelContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  border-radius: 10px;
  padding: 1rem;
`

const slideL = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-50%);
  }
  100% {
    opacity: 1;
    transform: translateX(0%);
  }
`

const slideR = keyframes`
  0% {
    opacity: 0;
    transform: translateX(50%);
  }
  100% {
    opacity: 1;
    transform: translateX(0%);
  }
`

export const PlayersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem;
  border: 2px solid darkred;
  background: #1a1a1a;
  box-shadow: 0px 1px 12px rgba(221, 190, 11, 0.9);
  border-radius: 15px;
  width: 100%;
  height: 100%;
  & > div:first-child {
    animation: ${slideL} 2s linear;
    transition: 0.2s ease-in-out;
  }
  & > div:nth-child(2) {
    animation: ${slideR} 2s linear;
    transition: 0.2s ease-in-out;
  }
`;