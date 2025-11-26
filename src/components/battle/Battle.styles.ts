import styled from "styled-components";

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

export const SetupCard = styled.div`
  background: #1a1a1a;
  backdrop-filter: blur(12px);
  border-radius: 1rem;
  padding: 3rem;
  text-align: center;
  border: 1px solid #2a2a2a;

  h3 {
    color: white;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  p {
    color: #9ca3af;
    margin-bottom: 2rem;
  }
`;

export const StartButton = styled.button<{ $disabled: boolean }>`
  padding: 0.75rem 2rem;
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

export const BattleArena = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const BattleGrid = styled.div`
  display: grid;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const PlayerSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const StatusCard = styled.div`
  background: #1a1a1a;
  backdrop-filter: blur(12px);
  border-radius: 0.75rem;
  padding: 1rem;
  border: 1px solid #2a2a2a;
`;

export const StatusHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;

  h3 {
    color: white;
    margin: 0;
  }
`;

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
`;

export const CardDisplay = styled.div`
  max-width: 20rem;
  margin: 0 auto;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

export const ActionButton = styled.button<{ $variant: 'attack' | 'defend' }>`
  flex: 1;
  background: ${props => props.$variant === 'attack' 
    ? 'linear-gradient(to right, #7f1d1d, #450a0a)' 
    : '#262626'};
  color: white;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: ${props => props.$variant === 'attack' 
    ? '1px solid rgba(202, 138, 4, 0.3)' 
    : '1px solid #525252'};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background: ${props => props.$variant === 'attack' 
      ? 'linear-gradient(to right, #991b1b, #7f1d1d)' 
      : '#404040'};
  }
`;

export const TurnIndicator = styled.div`
  background: #262626;
  border: 1px solid #404040;
  border-radius: 0.5rem;
  padding: 1rem;
  text-align: center;

  p {
    color: #eab308;
  }
`;

export const BattleLog = styled.div`
  background: #1a1a1a;
  backdrop-filter: blur(12px);
  border-radius: 0.75rem;
  padding: 1.5rem;
  border: 1px solid #2a2a2a;

  h3 {
    color: white;
    margin-bottom: 1rem;
  }
`;

export const LogContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 10rem;
  overflow-y: auto;

  div {
    color: #9ca3af;
    font-size: 0.875rem;
  }
`;

export const ResultCard = styled.div`
  background: #1a1a1a;
  backdrop-filter: blur(12px);
  border-radius: 1rem;
  padding: 3rem;
  text-align: center;
  border: 1px solid #2a2a2a;

  h3 {
    color: white;
    font-size: 1.875rem;
    margin-bottom: 1rem;
  }
`;

export const DefeatIcon = styled.div`
  width: 5rem;
  height: 5rem;
  background: rgba(127, 29, 29, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  border: 2px solid #991b1b;
  font-size: 2.25rem;
`;

export const ResetButton = styled.button`
  background: linear-gradient(to right, #7f1d1d, #450a0a);
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(202, 138, 4, 0.3);
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: linear-gradient(to right, #991b1b, #7f1d1d);
  }
`;