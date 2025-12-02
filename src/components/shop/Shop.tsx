import ModalComponent from './Modal';

import { Package } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Card, UserData } from '../../App';
import { Container, Header, IconWrapper, PackCard, PackContent, PackInfo, PacksGrid, PriceBox, PurchaseButton } from './Shop.styles';
import { BoosterPack, boosterPacks, OpeninBoosterPack } from './packLogic';
import { useSelector } from 'react-redux';
import { RootState } from '../library/store';

interface ShopProps {
  updateUser: (user: UserData) => void;
}

export const boosterColors: Record<string, string> = {
  basic: 'linear-gradient(to bottom right, #e4e4e4ff, #4d4d4dff, #ffffffff, #4d4d4dff, #8d8d8dff)',
  great: 'linear-gradient(to bottom right, #74b0ffff, #163c6dff, #509cffff, #092f5cff, #0059ffff)',
  ultra: 'linear-gradient(to bottom right, #eed253ff, #574207ff, #ffe397ff, #574207ff, #dfad0aff)',
  master: 'linear-gradient(to bottom right, #d453eeff, #5f1359ff, #ec8affff, #581753ff, #ff07f3ff)',
};

export function Shop({ updateUser }: ShopProps) {

  const [openingPack, setOpeningPack] = useState(false);
  const [revealedCards, setRevealedCards] = useState<Card[]>([]);
  
  const user = useSelector((state: RootState) => state.user);

  const [loading, setLoading] = useState<boolean>(false);

  const purchasePack = async (pack: BoosterPack) => {
    if (user.coins < pack.price) {
      toast.error('You do not have enough coins to purchase this pack.', {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "dark",
        style: {
          fontSize: '1.2rem',
          gap: '0 1rem'
        }
      });
      return;
    }
    setLoading(true);
    setOpeningPack(true);
    // Generate cards from fetched pokemon list if available, else fall back
    const newCards: Card[] = [];
    const boosterPack = await OpeninBoosterPack(pack)
    newCards.push(...boosterPack);
    setRevealedCards(newCards);

    // Deduct coins and immediately add cards to the user's collection
    updateUser({
      ...user,
      coins: user.coins - pack.price,
      collection: [...user.collection, ...newCards]
    });
    setTimeout(() => {
      setLoading(false);
    }, 1000)
  };

  const closePackOpening = () => {
    setOpeningPack(false);
    setRevealedCards([]);
    setLoading(false)
  };

  return (
    <Container>
      <Header>
        <h2>Card Shop</h2>
        <p>Purchase booster packs to expand your collection</p>
      </Header>

      <PacksGrid>
        {boosterPacks.map((pack, i) => (
          <PackCard key={pack.id + '-' + i} $type={boosterColors[pack.tag]} $show $delay={i * 0.25}>
            <PackContent>
              <IconWrapper>
                <Package style={{ width: '2.5rem', height: '2.5rem', color: '#eab308' }} />
              </IconWrapper>

              <PackInfo>
                <h3>{pack.name.toUpperCase()}</h3>
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
        <ModalComponent {... { user, closePackOpening, revealedCards, loading}} />
      )}
    </Container>
  );
}
