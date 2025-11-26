import { useState } from 'react';
import styled from 'styled-components';
import { UserData, Card } from '../App';
import { PokemonCard } from './PokemonCard';
import { Plus, Minus } from 'lucide-react';

interface CardLibraryProps {
  user: UserData;
  updateUser: (user: UserData) => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Header = styled.div`
  h2 {
    color: white;
    font-size: 1.875rem;
    margin-bottom: 0.5rem;
  }

  p {
    color: #9ca3af;
  }
`;

const EmptyState = styled.div`
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

const Section = styled.div`
  h3 {
    color: white;
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }
`;

const DeckEmpty = styled.div`
  background: #1a1a1a;
  backdrop-filter: blur(12px);
  border-radius: 0.75rem;
  padding: 2rem;
  text-align: center;
  border: 1px solid #2a2a2a;

  p {
    color: #9ca3af;
  }
`;

const CardsGrid = styled.div<{ $columns?: number }>`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(${props => props.$columns || 3}, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(${props => props.$columns === 6 ? 6 : 4}, 1fr);
  }

  @media (min-width: 1280px) {
    grid-template-columns: repeat(6, 1fr);
  }
`;

const CardContainer = styled.div`
  position: relative;
`;

const ActionButton = styled.button<{ $variant: 'add' | 'remove' }>`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: ${props => props.$variant === 'remove' ? '#7f1d1d' : '#a16207'};
  color: white;
  padding: 0.25rem;
  border-radius: 50%;
  border: ${props => props.$variant === 'remove' ? '1px solid rgba(202, 138, 4, 0.3)' : 'none'};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.$variant === 'remove' ? '#991b1b' : '#ca8a04'};
  }
`;

const Modal = styled.div`
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

const ModalContent = styled.div`
  max-width: 28rem;
`;

export function CardLibrary({ user, updateUser }: CardLibraryProps) {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  const isInDeck = (cardId: string) => {
    return user.battleDeck.some(card => card.id === cardId);
  };

  const addToDeck = (card: Card) => {
    if (user.battleDeck.length < 6) {
      updateUser({
        ...user,
        battleDeck: [...user.battleDeck, card]
      });
    }
  };

  const removeFromDeck = (cardId: string) => {
    updateUser({
      ...user,
      battleDeck: user.battleDeck.filter(card => card.id !== cardId)
    });
  };

  return (
    <Container>
      <Header>
        <h2>Your Collection</h2>
        <p>{user.collection.length} cards collected</p>
      </Header>

      {user.collection.length === 0 ? (
        <EmptyState>
          <p>Your collection is empty. Visit the shop to purchase booster packs!</p>
        </EmptyState>
      ) : (
        <>
          <Section>
            <h3>Battle Deck ({user.battleDeck.length}/6)</h3>
            {user.battleDeck.length === 0 ? (
              <DeckEmpty>
                <p>Add cards to your battle deck (max 6)</p>
              </DeckEmpty>
            ) : (
              <CardsGrid $columns={6}>
                {user.battleDeck.map((card) => (
                  <CardContainer key={card.id}>
                    <PokemonCard card={card} onClick={() => setSelectedCard(card)} />
                    <ActionButton
                      $variant="remove"
                      onClick={() => removeFromDeck(card.id)}
                    >
                      <Minus style={{ width: '1rem', height: '1rem' }} />
                    </ActionButton>
                  </CardContainer>
                ))}
              </CardsGrid>
            )}
          </Section>

          <Section>
            <h3>All Cards</h3>
            <CardsGrid>
              {user.collection.map((card) => (
                <CardContainer key={card.id}>
                  <PokemonCard card={card} onClick={() => setSelectedCard(card)} />
                  {!isInDeck(card.id) && user.battleDeck.length < 6 && (
                    <ActionButton
                      $variant="add"
                      onClick={() => addToDeck(card)}
                    >
                      <Plus style={{ width: '1rem', height: '1rem' }} />
                    </ActionButton>
                  )}
                </CardContainer>
              ))}
            </CardsGrid>
          </Section>
        </>
      )}

      {selectedCard && (
        <Modal onClick={() => setSelectedCard(null)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <PokemonCard card={selectedCard} large />
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
}
