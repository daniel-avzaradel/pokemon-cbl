import { useState } from 'react';
import { UserData, Card } from '../../App';
import { PokemonCard } from '../common/PokemonCard';
import { CardContainer, CardsGrid, Container, DeckEmpty, EmptyState, Header, Modal, ModalContent, Section } from './MyCards.module';
import AllCards from './AllCards';

interface MyCardsProps {
  user: UserData;
  updateUser: (user: UserData) => void;
}

export function MyCards({ user, updateUser }: MyCardsProps) {

  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  const addToDeck = (card: Card) => {
    if (user.battleDeck.length < 6) {
      updateUser({
        ...user,
        battleDeck: [...user.battleDeck, card]
      });
    }
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
            <br />
            {user.battleDeck.length === 0 ? (
              <DeckEmpty>
                <p>Add cards to your battle deck (max 6)</p>
              </DeckEmpty>
            ) : (
              <CardsGrid $columns={6}>
                {user.battleDeck.map((card) => (
                  <CardContainer key={card.id}>
                    <PokemonCard {... { user }} card={card} onClick={() => setSelectedCard(card)} />
                  </CardContainer>
                ))}
              </CardsGrid>
            )}
          </Section>
          <AllCards {...{ user, updateUser, addToDeck, setSelectedCard }} />
          
        </>
      )}

      {selectedCard && (
        <Modal onClick={() => setSelectedCard(null)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <PokemonCard {... { user, updateUser}} card={selectedCard} large />
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
}
