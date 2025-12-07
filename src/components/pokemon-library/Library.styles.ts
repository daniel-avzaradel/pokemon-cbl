import styled from "styled-components";
import { singleTypeColors, singleTypeColorsLib } from "../common/PokemonCards.styles";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    color: #e1e1e1;
    h1 {
        font-size: 3rem;
        color: #f1f1f1;
    }
`

export const Header = styled.div`
  h2 {
    color: white;
    font-size: 1.875rem;
    margin-bottom: 0.5rem;
  }

  p {
    color: #9ca3af;
  }
`;

export const LibraryCardContainer = styled.div`
  display: flex;
  flex-basis: 960px;
  flex-wrap: wrap;
  min-height: 0;
  overflow-y: scroll;
  padding-right: 1rem;
  padding-top: 4px;
  gap: 1rem;
  width: 100%;
  box-sizing: border-box;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.2);
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255,255,255,0.4);
  }
`

export const LibraryCardWrapper = styled.div<{ $type?: string }>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 4px;
  width: 24%;
  box-sizing: border-box;
  background: ${p => p.$type ? darkenHex(singleTypeColorsLib[p.$type as keyof typeof singleTypeColorsLib], 60) : "#333"};;
  transition: 0.2s ease-in-out;
  cursor: pointer;
  padding: 2px 10px;
  gap: 0 1rem;
  border: 1px solid #555;
  &:hover {
    background: ${p => darkenHex(singleTypeColorsLib[p.$type as keyof typeof singleTypeColorsLib], 80)}
  }
`

export const CardDataDiv = styled.div<{ $type?: string }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  border: ${p => p.$type ? '1px solid' + singleTypeColors[p.$type as keyof typeof singleTypeColors] : "#333"};
  color: #d1d1d1;
`

/**
 * Darkens a hex color by a given percentage
 * @param hex - color in hex format, e.g. "#ff0000"
 * @param percent - how much to darken (0-100)
 */
export function darkenHex(hex: string, percent: number): string {
  if (!hex) return ""
  // Remove the hash if present
  hex = hex.replace(/^#/, '');

  // Handle shorthand: #RGB or #RGBA
  if (hex.length === 3 || hex.length === 4) {
    hex = hex.split('').map(c => c + c).join('');
  }

  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  // Optional alpha
  let a: number | null = null;
  if (hex.length === 8) {
    a = parseInt(hex.substring(6, 8), 16);
  }

  const factor = 1 - percent / 100;

  r = Math.max(0, Math.floor(r * factor));
  g = Math.max(0, Math.floor(g * factor));
  b = Math.max(0, Math.floor(b * factor));

  const rgbHex =
    "#" +
    r.toString(16).padStart(2, "0") +
    g.toString(16).padStart(2, "0") +
    b.toString(16).padStart(2, "0");

  if (a !== null) {
    return rgbHex + a.toString(16).padStart(2, "0");
  }

  return rgbHex;
}

export const TypeTag = styled.div<{ $type?: string }>`
  display: flex;
  padding: 2px 6px;
  font-size: 0.7rem;
  font-family: Arial, Helvetica, sans-serif;
  color: white;
  background: ${p => p.$type ? darkenHex(singleTypeColorsLib[p.$type as keyof typeof singleTypeColorsLib], 20) : "#333"};
  border-radius: 4px;
  border: ${p => p.$type ? '1px solid' + singleTypeColors[p.$type as keyof typeof singleTypeColors] : "1px solid #333"};;
  color: ${p => p.$type ? singleTypeColors[p.$type as keyof typeof singleTypeColors] : "#e1e1e1"};
`

export const ModalPageContainer = styled.div`
  display: flex;
  position: absolute;
  top: 0;  
  justify-content: center;
  align-items: center;
  left: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 2rem;
  background: rgba(0,0,0, 0.8);
`

export const ModalContentContainer = styled.div<{$type: string}>`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 55%;
  height: auto;
  box-sizing: border-box;
  background: ${p => p.$type ? `linear-gradient(to bottom right, ${darkenHex(singleTypeColorsLib[p.$type as keyof typeof singleTypeColorsLib], 60)}, ${darkenHex(singleTypeColorsLib[p.$type as keyof typeof singleTypeColorsLib], 95)})` : '#444'};
  border-radius: 6px;
  border: 1px solid #444;
`

export const ModalContentGrid = styled.div<{$img: string}>`
  display: grid;
  grid-template-columns: 1.4fr 2fr;
  width: 100%;
  height: 100%;
  place-items: center;
  background-image: url(${p => p.$img ?? ""});
  background-size: 75%;
  background-repeat: no-repeat;

  background-position: -35% 50%;
`;

export const ModalPokemonDataDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 1rem;
  border: 1px solid #1a1a1a;
  border-radius: 6px;
  background: rgba(0,0,0, 0.8);
  border: 1px solid #1a1a1a;
  gap: 10px;
`

export const ModalDataHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 1rem;
  width: 100%;
  height: auto;
  border: 1px solid #2e2e2eff;
  border-radius: 4px;
  gap: 1rem;
  font-family: 'Courier New', Courier, monospace;
`

export const DivColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  gap: 4px;
`

export const ImageHolder = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`

export const ModalButton = styled.button`
  background: linear-gradient(to right, #7f1d1d, #450a0a);
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(202, 138, 4, 0.3);
  cursor: pointer;
  transition: all 0.5s ease;
  animation: fadeIn 0.5s ease-in-out;
  animation-fill-mode: backwards;
  margin-top: 1rem;
  bottom: 5%;
  left: 10%;
  transition: 0.5s ease-in-out;

  animation-delay: .2s;
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
  &:hover {
    background: linear-gradient(to right, #991b1b, #7f1d1d);
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  gap: 0.25rem;
  text-align: center;
  background-color: #1f1f1f;
  border: 2px solid #404040;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-blend-mode: overlay;
  width: 100%;
`;

export const StatsBarContainer = styled.div<{$modal?: boolean}>`
  grid-column: auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  gap: 4px;
`;

export const StatsBarRow = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: .2fr 1fr .1fr;
  gap: 0.5rem;
  align-items: center;
  & > *:first-child {
    text-align: left;
  }
`;

export const StatsBarLabel = styled.div`
  color: #9ca3af;
  font-size: .9rem;
  font-weight: 600;
`;

export const StatsBarTrack = styled.div`
  background: #404040;
  border-radius: 0.5rem;
  height: 0.7rem;
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
  font-size: 0.9rem;
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
  }

  .value {
    color: ${props => props.$textColor};
  }
`;