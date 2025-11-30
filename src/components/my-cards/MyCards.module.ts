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

export const EmptyState = styled.div`
  background: #1a1a1a;
  backdrop-filter: blur(12px);
  border-radius: 1rem;
  padding: 3rem;
  text-align: center;
  border: 1px solid #2a2a2a;

  p {
    color: #9ca3af;
    font-size: 1.125rem;
  }
`;

export const Section = styled.div`
  h3 {
    color: white;
    font-size: 1.25rem;
  }
`;

export const DeckEmpty = styled.div`
  background: #1a1a1a;
  backdrop-filter: blur(12px);
  border-radius: 0.75rem;
  padding: 2rem;
  text-align: center;
  border: 1px solid #2a2a2a;
  width: 100%;
  maх-width: 100%;

  p {
    color: #9ca3af;
  }
`;

export const CardsGrid = styled.div<{ $columns?: number }>`
  display: grid;
  grid-template-columns: repeat(6, minmax(auto, 1fr));
  gap: 1rem;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  & > *:hover {
    transform: scale(1.05);
    transition: 0.3s all ease-in-out;
  }
  * > * {
    transition: .5s ease; /* make sure hover transition is smooth */
  }
`;

export const CardContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  &:hover > button {
    opacity: 1;
  }
`;

export const ActionButton = styled.button<{ $variant: 'add' | 'remove' }>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: .9rem;
  width: 200px;
  background: ${props => props.$variant === 'remove' ? '#7f1d1d' : '#1b6446ff'};
  color: white;
  padding: 0.05rem;
  height: 26px;
  box-sizing: border-box;
  border-radius: 25px;
  border: ${props => props.$variant === 'remove' ? '1px solid rgba(202, 138, 4, 0.3)' : 'none'};
  cursor: pointer;
  transition: all 0.2s ease;
  opacity: 1;
  border: 1px solid #e1e1e1;
  z-index: 10;
  & > svg {
    width: 16px;
    height: 16px;}
  &:hover {
    background: ${props => props.$variant === 'remove' ? '#991b1b' : '#113b2aff'};
  }
`;

export const Modal = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 50;
    padding: 1rem;
`;

export const ModalContent = styled.div`
  max-width: 28rem;
`;

export const AllCardsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`;