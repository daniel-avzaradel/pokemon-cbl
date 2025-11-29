import styled from "styled-components";

export const ActionsPageContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    flex: 1;
    gap: 10px;
`

export const ActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
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

export const MovesetContainer = styled.div`
  display: grid;
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  padding: 10px;
  width: 100%;
  height: 100%;
  border-radius: 0.75rem;
`