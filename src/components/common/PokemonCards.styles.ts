import styled from "styled-components";
import { Flame, Droplet, Leaf, Zap, Brain, Hand, Circle } from 'lucide-react';

export const typeColors: Record<string, string> = {
  fire: 'linear-gradient(to bottom right, #832929ff, #c2410c)',
  water: 'linear-gradient(to bottom right, #6bc9e6ff, #031e2bff)',
  grass: 'linear-gradient(to bottom right, #16a34a, #094230ff)',
  electric: 'linear-gradient(to bottom right, #bb9d42ff, #3d2c08ff)',
  psychic: 'linear-gradient(to bottom right, #9333ea, #db2777)',
  fighting: 'linear-gradient(to bottom right, #da7b55ff, #291203ff)',
  normal: 'linear-gradient(to bottom right, #8b8b8bff, #353535ff)'
};

export const typeIcons = {
  fire: Flame,
  water: Droplet,
  grass: Leaf,
  electric: Zap,
  psychic: Brain,
  fighting: Hand,
  normal: Circle
};

export const rarityColors: Record<string, string> = {
  common: '#737373',
  uncommon: '#22c55e',
  rare: '#3b82f6',
  'ultra-rare': '#eab308'
};

export const CardWrapper = styled.div<{ $large?: boolean; $clickable?: boolean }>`
  max-height: 100%;
  width: 240px;
  cursor: ${props => props.$clickable ? 'pointer' : 'default'};
  transition: transform 0.2s ease;
  &:hover {
  }
`;

export const CardOuter = styled.div<{ $gradient: string; $rarityColor: string }>`
  background: ${props => props.$gradient};
  border-radius: 0.75rem;
  border: 2px solid #d1d1d1;
  box-sizing: border-box;
  width: 100%;
`;

export const CardInner = styled.div<{$type: string}>`
  background-color: ${props => typeColors[props.$type] || 'linear-gradient(to bottom right, #262626, #0a0a0a)'};
  border-radius: 0.5rem;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CardName = styled.h3`
  color: white;
  margin: 0;
`;

export const ImageContainer = styled.div<{$type: string}>`
  aspect-ratio: 1;
  background-image: ${props => typeColors[props.$type] || '#0a0a0a'};
  background-color: #a1a1a1;
  background-blend-mode: hard-light;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.5rem;
  bacground-blend-mode: overlay;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  text-align: center;
`;

export const StatsBarContainer = styled.div`
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
`;

export const StatsBarRow = styled.div`
  display: grid;
  grid-template-columns: 3rem 1fr 2rem;
  gap: 0.2rem;
  align-items: center;
  & > *:first-child {
    text-align: left;
  }
`;

export const StatsBarLabel = styled.div`
  color: #9ca3af;
  font-size: 0.75rem;
  font-weight: 600;
`;

export const StatsBarTrack = styled.div`
  background: #404040;
  border-radius: 0.25rem;
  height: 0.5rem;
  overflow: hidden;
`;

export const StatsBarFill = styled.div<{ $width: number; $color: string }>`
  width: ${props => props.$width}%;
  height: 100%;
  background-color: ${props => props.$color};
  transition: width 0.2s ease;
`;

export const StatsBarValue = styled.div<{ $color: string }>`
  color: ${props => props.$color};
  font-size: 0.75rem;
  font-weight: 600;
  text-align: right;
`;

export const StatBox = styled.div<{ $bgColor: string; $textColor: string }>`
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

export const RarityLabel = styled.div`
  text-align: center;
  color: #9ca3af;
  font-size: 0.75rem;
  text-transform: capitalize;
`;