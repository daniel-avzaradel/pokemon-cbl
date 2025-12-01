import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  75% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

export const ActionsPageContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    & > div:first-child {
      width: 220px;
      animation: ${fadeIn} 2s linear;
    }
`

export const ActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: min-content;
  height: 100%;
  gap: 10px;
`

export const HpDisplay = styled.div<{ $color: string }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.$color};
`;

export const HealthBarContainer = styled.div`
  position: relative;
`;

export const HealthBarBg = styled.div`
  width: 100%;
  height: 0.75rem;
  background: #262626;
  border-radius: 9999px;
  overflow: hidden;
  border: 1px solid #404040;
`;

export const HealthBarFill = styled.div<{ $width: number; $color: string }>`
  height: 100%;
  background: ${props => props.$color};
  transition: width 0.5s ease;
  width: ${props => props.$width}%;
  transition: 0.5s ease-in-out;
`;

export const StatusCard = styled.div`
  width: 100%;
  background: #1a1a1a;
  backdrop-filter: blur(12px);
  border-radius: 0.75rem;
  padding: 10px;
  border: 1px solid #2a2a2a;
`;

export const StatusHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  gap: 0.5rem;

  h3 {
    color: white;
    margin: 0;
  }
`;

export const LogBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 10px;
  background: #111;
  border: 1px solid #d1d1d1;
  border-radius: 6px;
  width: 300px;
  height: 250px;
  box-sizing: border-box;
  color: #e1e1e1;
  gap: 0.5rem;
  z-index: 999;

  & > h4 {
    font-size: 0.9rem;
    font-family: arial;
    color: goldenrod;
    margin: 0;
  }
`

export const LogContent = styled.div`
  flex: 1 1 auto;
  width: 99%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0.5rem;
  box-sizing: border-box;

  & > * {
    flex-shrink: 0;
    width: 100%;
    word-wrap: break-word;
    margin-bottom: 0.25rem;
  }
`

const typing = (chars: number) => keyframes`
  from { width: 0ch; }
  to { width: 100%; }
`;

const blink = keyframes`
  50% { border-color: transparent; }
`;

// Pass the text length as a prop
export const TypingText = styled.span<{ $chars: number }>`
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-align: left;

  animation:
    ${props => typing(props.$chars)} 2s steps(35, end) forwards,
    ${blink} 0.75s step-end infinite;
`;

export const MovesetContainer = styled.div`
  display: grid;
  place-items: start;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  padding: 10px;
  width: 100%;
  height: auto;
  border-radius: 0.75rem;
`

export const MovesetButton = styled.button<{$color?: string, disabled?: boolean}>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border: 1px solid #e1e1e1;
  border-radius: 4px;
  background: ${p => p.disabled ? '#555' : p.$color ?? 'darkred'};
  color: white;
  cursor: pointer;
  opacity: 0.8;
  padding: 6px 10px;
  width: 100px;
  &:hover {
    opacity: 1;
  }
`

export const TurnEventsColumn = styled.div<{$rotate?: boolean}>`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  gap: 2rem;
  & > h1 {
    font-size: 1.4rem;
    transition: 0.4s ease-in-out;
    margin: 0;
  }
  & > div {
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
  & > div > svg {
    transition: 0.4s ease-in-out;
    background: #111;
    border-radius: 50%;
    border: 1px solid #d1d1d1;
    transform: rotate(${p => p.$rotate ? '-180deg' : '360deg'})
  }
`