import { useMemo, useState } from 'react';
import { Card, UserData } from '../../App';
import { ActionButton } from '../my-cards/MyCards.module';
import { CardHeader, CardImage, CardInner, CardName, CardOuter, CardWrapper, ImageContainer, rarityColors, RarityLabel, singleTypeColors, StatsBarContainer, StatsBarFill, StatsBarLabel, StatsBarRow, StatsBarTrack, StatsBarValue, StatsGrid, typeColors, typeIcons } from './PokemonCards.styles';
import { Circle } from 'lucide-react';
import { Minus } from 'lucide-react';

interface PokemonCardProps {
  card: Card;
  onClick?: () => void;
  large?: boolean;
  user: UserData;
  updateUser: (user: UserData) => void;
  deck?: boolean;
}

export function PokemonCard({ card, onClick, large, user, updateUser, deck }: PokemonCardProps) {
  const primaryType = Array.isArray(card.types) && card.types.length > 0 ? card.types[0] : 'normal';
  const TypeIcon = typeIcons[primaryType as keyof typeof typeIcons] || Circle;
  const rarity = (card as any).rarity as string | undefined;

  const [mouseOver, setMouseOver] = useState(false);

    const removeFromDeck = (cardId: number) => {
      updateUser({
        ...user,
        battleDeck: user.battleDeck.filter(card => card.id !== cardId)
      });
    };

    return (
      <CardWrapper $large={large} $clickable={!!onClick} onClick={onClick} onMouseEnter={() => setMouseOver(true)} onMouseLeave={() => setMouseOver(false)}>
        <CardOuter $type={typeColors[primaryType]} $gradient={typeColors[primaryType] || typeColors.normal} $rarityColor={rarity ? (rarityColors[rarity] ?? '#d1d1d1') : '#d1d1d1'}>
          <CardInner $type={primaryType}>
            <CardHeader>
              <CardName>{card.name.charAt(0).toUpperCase() + card.name.slice(1)}</CardName>
              <TypeIcon style={{ width: '1.25rem', height: '1.25rem', color: `${singleTypeColors[primaryType] || '#e1e1e1'}` }} />
            </CardHeader>

            <ImageContainer $type={primaryType}>
              <CardImage src={card.imageUrl ?? ''} alt={card.name} />
            </ImageContainer>

            <StatsGrid>
              <StatsBarContainer>
                {[
                  { label: 'HP', value: card.stats.hp, color: '#f87171' },
                  { label: 'ATK', value: card.stats.attack, color: '#eab308' },
                  { label: 'DEF', value: card.stats.defense, color: '#60a5fa' },
                  { label: 'SP ATK', value: card.stats.specialAttack, color: '#a78bfa' },
                  { label: 'SP DEF', value: card.stats.specialDefense, color: '#34d399' },
                  { label: 'SPD', value: card.stats.speed, color: '#fb923c' }
                ].map(stat => (
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

            {rarity ? <RarityLabel>{rarity}</RarityLabel> : <RarityLabel />}

            {(deck && mouseOver) && (
            <ActionButton
              $variant="remove"
              onClick={(e) => {
                e.stopPropagation();
                removeFromDeck(card.id)
              }}
            >
              <Minus />
            </ActionButton>
          )}
          </CardInner>
        </CardOuter>
      </CardWrapper>
    );
  }
