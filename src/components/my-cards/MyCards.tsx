import { useState } from 'react';
import { UserData, Card } from '../../App';
import { PokemonCard } from '../common/PokemonCard';
import { CardContainer, CardsGrid, Container, DeckEmpty, EmptyState, Header, Section } from './MyCards.module';
import AllCards from './AllCards';
import { RootState } from '../lib/store';
import { useSelector } from 'react-redux';
import LibraryModal from '../pokemon-library/Modal';
import { toast } from 'react-toastify';

interface MyCardsProps {
  updateUser: (user: UserData) => void;
}

export function MyCards({ updateUser }: MyCardsProps) {

  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.user);


  const addToDeck = (card: Card) => {
    if (user.battleDeck.length < 6) {
      updateUser({
        ...user,
        battleDeck: [...user.battleDeck, card]
      });
    }
  };

  const handleButtonAction = (card: Card, action: string) => {
    console.log(card, action);

    if (action === 'add') {
      if (user.battleDeck.length < 6) {
        if(user.battleDeck.some(p => p.id === card.id)) {
          return toast.warning('You cannot add two equal cards to the deck', { theme: 'dark'})
        }
        updateUser({
          ...user,
          battleDeck: [...user.battleDeck, card]
        });
      }
    }
    if (action === 'remove') {
      updateUser({
        ...user,
        battleDeck: user.battleDeck.filter(c => c.uid !== card.uid)
      });
    }
    if (action === 'details') {
      setSelectedCard(card)
      setOpenModal(true)
    }
  }


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
                  <CardContainer key={card.id + '-' + card.uid}>
                    <PokemonCard {... { user }} card={card} deck onClick={handleButtonAction} />
                  </CardContainer>
                ))}
              </CardsGrid>
            )}
          </Section>
          <AllCards {...{ user, updateUser, addToDeck }} onClick={handleButtonAction} collection />

        </>
      )}
      {openModal && (
        <LibraryModal {...{setOpenModal}} selectedPokemon={selectedCard} />
      )}
    </Container>
  );
}
