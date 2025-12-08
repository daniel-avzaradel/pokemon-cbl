import { Circle } from 'lucide-react';
import { Card, UserData } from '../../App';
import { CardHeader, CardImage, CardInner, CardName, CardOuter, CardWrapper, ImageContainer, singleTypeColors, StatsBarContainer, StatsBarFill, StatsBarLabel, StatsBarRow, StatsBarTrack, StatsBarValue, StatsGrid, typeColors, typeIcons } from './PokemonCards.styles';
import { useLocation } from 'react-router-dom';

interface PokemonCardProps {
  card: Card;
  user?: UserData;
  deck?: boolean;
  large?: boolean;
}

export function PokemonCard({ card, large, deck, user }: PokemonCardProps) {
  const primaryType = Array.isArray(card.types) && card.types.length > 0 ? card.types[0] : 'normal';
  const TypeIcon = typeIcons[primaryType as keyof typeof typeIcons] || Circle;

  const params = useLocation();

  const statusArray = [
    { label: 'HP', value: card.stats.hp, color: '#f87171' },
    { label: 'ATK', value: card.stats.attack, color: '#eab308' },
    { label: 'DEF', value: card.stats.defense, color: '#60a5fa' },
    { label: 'SP ATK', value: card.stats.specialAttack, color: '#a78bfa' },
    { label: 'SP DEF', value: card.stats.specialDefense, color: '#34d399' },
    { label: 'SPD', value: card.stats.speed, color: '#fb923c' }
  ]

  const isInDeck = (cardId: number) => {
    if(!user) return;
    return user.battleDeck.some(card => card.uid === cardId);
  };

  const rarity = (card: Card) => {
    let rarityValue = Object.values(card.stats).reduce((a, b) => a + b, 0) >= 550;
    return rarityValue ?? false;
  }

  return (
    <CardWrapper $inDeck={(deck || large || params.pathname.includes('/battle')) ? false : isInDeck(card.uid)}>
      <CardOuter $type={typeColors[primaryType]}  >
        <CardInner $type={primaryType} $rarity={rarity(card)} $shine={card.isFoil}>
          <CardHeader $type={primaryType}>
            <CardName>{card.name.charAt(0).toUpperCase() + card.name.slice(1)}</CardName>
            <TypeIcon style={{ width: '1.25rem', height: '1.25rem', fill: `${singleTypeColors[primaryType] || '#e1e1e1'}` }} />
          </CardHeader>

          <ImageContainer $type={primaryType} $rarity={rarity(card)} $shine={card.isFoil}>
            <CardImage src={card.imageUrl ?? ''} alt={card.name} />
          </ImageContainer>

          <StatsGrid>
            <StatsBarContainer>
              {statusArray.map(stat => (
                <StatsBarRow key={stat.label}>
                  <StatsBarLabel>{stat.label}</StatsBarLabel>
                  <StatsBarTrack>
                    <StatsBarFill $width={Math.min(stat.value, 100)} $color={stat.color} />
                  </StatsBarTrack>
                  <StatsBarValue $color={stat.color}>{stat.value}</StatsBarValue>
                </StatsBarRow>
              ))}
            </StatsBarContainer>
          </StatsGrid>
        </CardInner>
      </CardOuter>
    </CardWrapper>
  );
}
