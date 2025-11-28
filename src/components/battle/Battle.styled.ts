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
  flex-direction: row;
  width: 100%;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-size: 3rem;
  & > svg {
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