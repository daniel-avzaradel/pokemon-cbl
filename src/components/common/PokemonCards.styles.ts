import styled from "styled-components";
import { Flame, Droplet, Moon, Leaf, Anvil, Zap, Brain, Hand, FlaskConical, Circle, Ghost, Origami, Snowflake, Bug, BrickWall, Mountain } from 'lucide-react';
import Foil from '../../assets/foil1.gif';
import ShineTexture from '../../assets/foil4.gif';
import Texture01 from '../../assets/texture01.jpg';

export const typeColors: Record<string, string> = {
  fire: 'linear-gradient(to bottom right, #ee9153ff, #882a19ff, #740a0aff)',
  water: 'linear-gradient(to bottom right, #1884a5ff, #031e2bff)',
  ice: 'linear-gradient(to bottom right, #275457ff, #00f7ffff)',
  grass: 'linear-gradient(to bottom right, #16a34a, #094230ff)',
  bug: 'linear-gradient(to bottom right, #16a34a, #094230ff)',
  electric: 'linear-gradient(to bottom right, #dfd771ff, #5e5504ff)',
  psychic: 'linear-gradient(to bottom right, #5d2492ff, #ff0095ff)',
  fighting: 'linear-gradient(to bottom right, #da7b55ff, #291203ff)',
  normal: 'linear-gradient(to bottom right, #dfdfdfff, #353535ff)',
  dragon: 'linear-gradient(to bottom right, #ffde4bff, #511257ff)',
  poison: 'linear-gradient(to bottom right, #106b1fff, #70065eff)',
  ground: 'linear-gradient(to bottom right, #8d773aff, #fae794ff)',
  rock: 'linear-gradient(to bottom right, #493b13ff, #332718ff)',
  fairy: 'linear-gradient(to bottom right, #ffcdfaff, #33182fff)',
  ghost: 'linear-gradient(to bottom right, #ee9cffff, #4d0d43ff)',
  dark: 'linear-gradient(to bottom right, #000000ff, #1b0318ff)',
  steel: 'linear-gradient(to bottom right, #747474ff, #b4b4b4ff)',
};

export const singleTypeColors: Record<string, string> = {
  fire: '#f09a80ff',
  water: '#8dbaffff',
  ice: '#a0e1e4ff',
  grass: '#77ffa9ff',
  bug: '#83f8dbff',
  electric: '#bb9d42ff',
  psychic: '#e97eceff',
  fighting: '#fd956bff',
  dragon: '#ebdb80ff',
  poison: '#826df8ff',
  normal: '#d1d1d1ff',
  ground: '#f8d39cff',
  rock: '#fad9a9ff',
  fairy: '#fda7f2ff',
  ghost: '#c782ffff',
  dark: '#8a8091ff',
};

export const typeIcons = {
  fire: Flame,
  water: Droplet,
  grass: Leaf,
  electric: Zap,
  psychic: Brain,
  fighting: Hand,
  normal: Circle,
  dragon: Origami,
  poison: FlaskConical,
  ice: Snowflake,
  bug: Bug,
  ground: Mountain,
  rock: BrickWall,
  ghost: Ghost,
  dark: Moon,
  steel: Anvil
};

export const CardWrapper = styled.div<{ $clickable?: boolean, $inDeck?: boolean }>`
  max-height: 100%;
  width: 100%;
  cursor: ${props => props.$clickable ? 'pointer' : 'default'};
  transition: transform 0.2s ease;
  opacity: ${props => props.$inDeck ? 0.1 : 1};
`;

export const CardOuter = styled.div<{ $type: string }>`
  border-radius: 0.5rem;
  box-sizing: border-box;
  width: 100%;
  border: 4px solid color-mix(in srgb, ${p => singleTypeColors[p.$type] || "#e1e1e1"} 90%, black);
  padding: 0.25rem;
`;

export const CardInner = styled.div<{ $type: string, $rarity: boolean, $shine?: boolean }>`
  position: relative;
  border-radius: 0.25rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-image: ${props => {
    // Build layers dynamically
    const layers = [
      `url(${props.$rarity ? Texture01 : Texture01})`,
      typeColors[props.$type] || typeColors["normal"]
    ];

    // Add conditional 3rd layer
    if (props.$shine) {
      layers.push(`url(${ShineTexture})`);
      layers.push(typeColors[props.$type])
    }

    return layers.join(", ");
  }};

  background-size: ${props => (props.$shine ? "contain, cover" : "contain")};
  background-blend-mode: ${props => props.$rarity ? "screen" : props.$shine ? "lighten" : "luminosity"};
`;

export const CardHeader = styled.div<{ $type: string }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.5rem;
  border: 2px solid #333;
  margin: 0;
  border-radius: 1rem;
  font-size: medium;
  background-color: ${p => singleTypeColors[p.$type]};
  background-blend-mode: darken;

  & > h4 {
    color: #222;
  }
`;

export const CardName = styled.h4`
  font-size: 1rem;
  font-weight: 400;
  margin: 0;
`;

export const ImageContainer = styled.div<{ $type: string, $rarity: boolean, $shine?: boolean }>`
  aspect-ratio: 1;
  background: #222;
  background-image: url(${props => (props.$rarity && props.$shine) ? Foil : Texture01}), ${props => typeColors[props.$type] || typeColors['normal']};
  background-blend-mode: ${props => props.$shine ? "screen" : "color-dodge"};
  background-size: contain;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 2px solid #404040;
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
  gap: 0.25rem;
  text-align: center;
  background-color: #1f1f1f;
  border: 2px solid #404040;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-blend-mode: overlay;
`;

export const StatsBarContainer = styled.div`
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
`;

export const StatsBarRow = styled.div`
  display: grid;
  grid-template-columns: 2.4rem 1fr 2rem;
  gap: 0rem;
  align-items: center;
  & > *:first-child {
    text-align: left;
  }
`;

export const StatsBarLabel = styled.div`
  color: #9ca3af;
  font-size: 0.6rem;
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