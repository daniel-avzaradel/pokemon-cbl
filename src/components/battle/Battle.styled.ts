import styled from "styled-components";

export const BattleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
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
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-size: 3rem;
  & > svg {
    filter: drop-shadow(0px 2px 2px rgba(216, 153, 18, 0.9));
  }
`

export const LevelContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  border: 1px solid #333;
  border-radius: 10px;
  background: #222;
  padding: 2rem;
`

export const LevelCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #444;
  backdrop-filter: blur(12px);
  border-radius: .5rem;
  padding: 1.5rem;
  border: 1px solid #2a2a2a;
  transition: all 0.2s ease;
  gap: 1rem;

  &:hover {
    border-color: rgba(202, 138, 4, 0.5);
  }

  & > h1 {
    text-transform: uppercase;
  }
`