import { useState } from 'react';
import styled from 'styled-components';
import { UserData, Card } from '../App';
import { Package, Sparkles } from 'lucide-react';
import { PokemonCard } from './PokemonCard';
import { generateRandomCard, generateCardFromPokemon } from '../utils/cardGenerator';
import { usePokemon } from '../hooks/usePokemon';

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

const PacksGrid = styled.div`
  display: grid;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const PackCard = styled.div`
  background: #1a1a1a;
  backdrop-filter: blur(12px);
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid #2a2a2a;
  transition: all 0.2s ease;

  &:hover {
    border-color: rgba(202, 138, 4, 0.5);
  }
`;

const PackContent = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const IconWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 5rem;
  height: 5rem;
  background: linear-gradient(to bottom right, #7f1d1d, #450a0a);
  border-radius: 0.75rem;
  border: 2px solid rgba(202, 138, 4, 0.3);
  margin: 0 auto;
`;

const PackInfo = styled.div`
  h3 {
    color: white;
    font-size: 1.25rem;
    margin-bottom: 0.25rem;
  }

  p {
    color: #9ca3af;
    font-size: 0.875rem;
  }
`;

const PriceBox = styled.div`
  background: #262626;
  border-radius: 0.5rem;
  padding: 0.75rem;
  border: 1px solid #404040;

  .price {
    color: #eab308;
    font-size: 1.875rem;
  }

  .label {
    color: #9ca3af;
    font-size: 0.875rem;
  }
`;

const PurchaseButton = styled.button<{ $disabled: boolean }>`
  width: 100%;
  padding: 0.75rem;
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

const Modal = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding: 1rem;
`;

const ModalContent = styled.div`
  max-width: 72rem;
  width: 100%;
`;

const ModalHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const ModalTitle = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #eab308;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

const CardWrapper = styled.div<{ $delay: number }>`
  animation: fadeIn 0.5s ease-in-out;
  animation-delay: ${props => props.$delay}s;
  animation-fill-mode: backwards;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ContinueButton = styled.button`
  background: linear-gradient(to right, #7f1d1d, #450a0a);
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(202, 138, 4, 0.3);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: linear-gradient(to right, #991b1b, #7f1d1d);
  }
`;

const ButtonContainer = styled.div`
  text-align: center;
`;

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
      for (let i = 0; i < pack.cardCount; i++) {
        const isPremium = pack.id === 'premium';
        const isUltra = pack.id === 'ultra';
        newCards.push(generateRandomCard(isPremium, isUltra));
      }
    }

    setRevealedCards(newCards);

    // Deduct coins after a short delay
    setTimeout(() => {
      updateUser({
        ...user,
        coins: user.coins - pack.price,
        collection: [...user.collection, ...newCards]
      });
    }, 500);
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
                <CardWrapper key={card.id} $delay={index * 0.1}>
                  <PokemonCard card={card} />
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
