import { Package, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Card, UserData } from '../../App';
import { usePokemon } from '../../hooks/usePokemon';
import { generateCardFromPokemon } from '../../utils/generateCardFromPokemon';
import { generateRandomCard } from '../../utils/generateRandomCard';
import { PokemonCard } from '../common/PokemonCard';
import { ButtonContainer, CardsGrid, CardWrapper, Container, ContinueButton, Header, IconWrapper, Modal, ModalContent, ModalHeader, ModalTitle, PackCard, PackContent, PackInfo, PacksGrid, PriceBox, PurchaseButton } from './Shop.styles';

interface ShopProps {
  user: UserData;
  updateUser: (user: UserData) => void;
}

interface BoosterPack {
  id: string;
  name: string;
  price: number;
  cardCount: number;
  description: string;
}

const boosterPacks: BoosterPack[] = [
  {
    id: 'basic',
    name: 'Basic Pack',
    price: 100,
    cardCount: 3,
    description: 'Contains 3 random cards'
  },
  {
    id: 'premium',
    name: 'Premium Pack',
    price: 250,
    cardCount: 5,
    description: 'Contains 5 cards with higher rare chance'
  },
  {
    id: 'ultra',
    name: 'Ultra Pack',
    price: 500,
    cardCount: 10,
    description: 'Contains 10 cards with guaranteed rare'
  }
];



export function Shop({ user, updateUser }: ShopProps) {
  const [openingPack, setOpeningPack] = useState(false);
  const [revealedCards, setRevealedCards] = useState<Card[]>([]);
  const { pokemons, loading: pokemonsLoading, error: pokemonsError } = usePokemon();

  const purchasePack = (pack: BoosterPack) => {
    if (user.coins < pack.price) {
      alert('Not enough coins!');
      return;
    }

    setOpeningPack(true);
    // Generate cards from fetched pokemon list if available, else fall back
    const newCards: Card[] = [];
    if (pokemons && pokemons.length > 0) {
      // sample without replacement from pokemons
      const pool = [...pokemons];
      for (let i = 0; i < pack.cardCount; i++) {
        if (pool.length === 0) break;
        const idx = Math.floor(Math.random() * pool.length);
        const p = pool.splice(idx, 1)[0];
        newCards.push(generateCardFromPokemon(p));
      }
    } else {
      // fallback: generate random cards so packs always yield something
      for (let i = 0; i < pack.cardCount; i++) {
        newCards.push(generateRandomCard());
      }
    }
    
    // Ensure we always return the expected number of cards (fill any shortfall)
    while (newCards.length < pack.cardCount) {
      newCards.push(generateRandomCard());
    }
    setRevealedCards(newCards);

    // Deduct coins and immediately add cards to the user's collection
    updateUser({
      ...user,
      coins: user.coins - pack.price,
      collection: [...user.collection, ...newCards]
    });
  };

  const closePackOpening = () => {
    setOpeningPack(false);
    setRevealedCards([]);
  };

  return (
    <Container>
      <Header>
        <h2>Card Shop</h2>
        <p>Purchase booster packs to expand your collection</p>
      </Header>

      <PacksGrid>
        {boosterPacks.map((pack) => (
          <PackCard key={pack.id}>
            <PackContent>
              <IconWrapper>
                <Package style={{ width: '2.5rem', height: '2.5rem', color: '#eab308' }} />
              </IconWrapper>

              <PackInfo>
                <h3>{pack.name}</h3>
                <p>{pack.description}</p>
              </PackInfo>

              <PriceBox>
                <div className="price">{pack.price}</div>
                <div className="label">coins</div>
              </PriceBox>

              <PurchaseButton
                onClick={() => purchasePack(pack)}
                $disabled={user.coins < pack.price}
              >
                {user.coins < pack.price ? 'Not Enough Coins' : 'Purchase'}
              </PurchaseButton>
            </PackContent>
          </PackCard>
        ))}
      </PacksGrid>

      {openingPack && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>
                <Sparkles style={{ width: '2rem', height: '2rem' }} />
                <h2 style={{ margin: 0 }}>Pack Opened!</h2>
                <Sparkles style={{ width: '2rem', height: '2rem' }} />
              </ModalTitle>
            </ModalHeader>

            <CardsGrid>
              {revealedCards.map((card, index) => (
                <CardWrapper key={card.id} $delay={index * 0.2}>
                  <PokemonCard {...{ user }} card={card} shop />
                </CardWrapper>
              ))}
            </CardsGrid>

            <ButtonContainer>
              <ContinueButton onClick={closePackOpening}>
                Continue
              </ContinueButton>
            </ButtonContainer>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
}
