import styled from 'styled-components';
import { Card } from '../App';
import { Flame, Droplet, Leaf, Zap, Brain, Hand, Circle } from 'lucide-react';

interface PokemonCardProps {
  card: Card;
  onClick?: () => void;
  large?: boolean;
}

const typeColors: Record<string, string> = {
  fire: 'linear-gradient(to bottom right, #dc2626, #c2410c)',
  water: 'linear-gradient(to bottom right, #2563eb, #0891b2)',
  grass: 'linear-gradient(to bottom right, #16a34a, #059669)',
  electric: 'linear-gradient(to bottom right, #eab308, #ca8a04)',
  psychic: 'linear-gradient(to bottom right, #9333ea, #db2777)',
  fighting: 'linear-gradient(to bottom right, #c2410c, #991b1b)',
  normal: 'linear-gradient(to bottom right, #737373, #525252)'
};

const typeIcons = {
  fire: Flame,
  water: Droplet,
  grass: Leaf,
  electric: Zap,
  psychic: Brain,
  fighting: Hand,
  normal: Circle
};

const rarityColors: Record<string, string> = {
  common: '#737373',
  uncommon: '#22c55e',
  rare: '#3b82f6',
  'ultra-rare': '#eab308'
};

const CardWrapper = styled.div<{ $large?: boolean; $clickable?: boolean }>`
  width: ${props => props.$large ? '20rem' : '100%'};
  cursor: ${props => props.$clickable ? 'pointer' : 'default'};
  transition: transform 0.2s ease;

  &:hover {
    transform: ${props => props.$clickable ? 'scale(1.05)' : 'none'};
  }
`;

const CardOuter = styled.div<{ $gradient: string; $rarityColor: string }>`
  background: ${props => props.$gradient};
  border-radius: 0.75rem;
  padding: 0.25rem;
  border: 2px solid ${props => props.$rarityColor};
  box-shadow: ${props => props.$rarityColor === '#eab308' ? '0 0 20px rgba(234, 179, 8, 0.5)' : 'none'};
`;

const CardInner = styled.div`
  background: #1a1a1a;
  border-radius: 0.5rem;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CardName = styled.h3`
  color: white;
  margin: 0;
`;

const ImageContainer = styled.div`
  aspect-ratio: 1;
  background: linear-gradient(to bottom right, #262626, #0a0a0a);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.5rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  text-align: center;
`;

const StatBox = styled.div<{ $bgColor: string; $textColor: string }>`
  background: #262626;
  border: 1px solid #404040;
  border-radius: 0.25rem;
  padding: 0.25rem;
  
  .label {
    color: #9ca3af;
    font-size: 0.75rem;
  }

  .value {
    color: ${props => props.$textColor};
  }
`;

const RarityLabel = styled.div`
  text-align: center;
  color: #9ca3af;
  font-size: 0.75rem;
  text-transform: capitalize;
`;

export function PokemonCard({ card, onClick, large }: PokemonCardProps) {
  const TypeIcon = typeIcons[card.type];

  return (
    <CardWrapper $large={large} $clickable={!!onClick} onClick={onClick}>
      <CardOuter $gradient={typeColors[card.type]} $rarityColor={rarityColors[card.rarity]}>
        <CardInner>
          <CardHeader>
            <CardName>{card.name}</CardName>
            <TypeIcon style={{ width: '1.25rem', height: '1.25rem', color: '#d1d5db' }} />
          </CardHeader>

          <ImageContainer>
            <CardImage src={card.imageUrl} alt={card.name} />
          </ImageContainer>

          <StatsGrid>
            <StatBox $bgColor="#262626" $textColor="#f87171">
              <div className="label">HP</div>
              <div className="value">{card.hp}</div>
            </StatBox>
            <StatBox $bgColor="#262626" $textColor="#eab308">
              <div className="label">ATK</div>
              <div className="value">{card.attack}</div>
            </StatBox>
            <StatBox $bgColor="#262626" $textColor="#60a5fa">
              <div className="label">DEF</div>
              <div className="value">{card.defense}</div>
            </StatBox>
          </StatsGrid>

          <RarityLabel>{card.rarity}</RarityLabel>
        </CardInner>
      </CardOuter>
    </CardWrapper>
  );
}
