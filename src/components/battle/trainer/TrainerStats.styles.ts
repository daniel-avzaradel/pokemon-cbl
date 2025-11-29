import styled from "styled-components";
import Pokeball from '../../../assets/pokeball.png'

export const TrainerStatsContainer = styled.div`
    display: flex;
    width: 560px;
    height: 360px;
    background: #292929ff;
    background-image: url(${Pokeball});
    background-position: left;
    background-blend-mode: soft-light;
    padding: 10px;
    border-radius: 10px;
    border: 2px solid #ffffffff;
`

export const TrainerStatsHeader = styled.header`
    display: flex;
    color: #c7c7c7ff;
    width: 100%;
    gap: 2rem;
`

export const TrainerProfilePic = styled.div<{$image: string}>`
    border-radius: 50%;
    background-image: url(${p => p.$image});
    background-size: 200%;
    background-position: 40% 20%;
    background-repeat: no-repeat;
    background-color: #ffae00ff;
    width: 140px;
    height: 140px;
    border: 4px solid #ffae00ff;
`

export const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background: #141414ff;
    padding: 4px 1rem;
    height: auto;
    width: 100%;
    border-radius: 4px;
    margin-bottom: 4px;
    border-bottom: 1px solid #ccc;
    gap: 3rem;
    & > div {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
`

export const TrainerHeaderName = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    background: #141414ff;
    height: auto;
    width: auto;
    
    & > h1 {
        color: goldenrod;
    }
`

export const TrainerPokemonStatsWrapper = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: auto;
    width: 100%;
    border-radius: 4px;
    gap: 1rem;
`

export const TrainerPokemonStats = styled.main`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    height: auto;
    border-radius: 4px;
    background: transparent;
    backdrop-filter: sepia(0.5);
    width: 100%;
    height: 100%;
    gap: 4px;
`

export const PokemonBox = styled.div<{
  $image: string;
  $fainted?: boolean;
}>`
  position: relative;
  width: 100%;
  height: 100%;
  border: 2px solid #111;
  border-radius: 6px;

  /* Combined background: overlay color + image */
  background-image: 
    ${p => p.$fainted 
      ? 'linear-gradient(rgba(255, 255, 255, 1), rgba(209, 209, 209, 0.7))'
      : 'linear-gradient(to bottom right, #ffffffff, #7a622eff)'},
    url(${p => p.$image});
  background-size: 240%;
  background-position: 50% 30%;
  background-repeat: no-repeat;
  background-blend-mode: ${p => p.$fainted ? 'hue' : 'soft-light'};

  filter: ${p => p.$fainted ? 'brightness(0.2)' : 'none'};
`;

export const PokemonTray = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    border-bottom: 1px solid #e1e1e1;
    gap: 0 4px;
    padding: 4px 0;
    & > div > img {
        position: relative;
        width: 22px;
        height: 22px;
    }
`

export const FaintedPokemonStatus = styled.div`
    display: flex;
    border-radius: 50%;
    width: 22px;
    height: 22px;
    background-color: #0f0f0fff;
    border: 1px solid #444;
`

export const DivColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 100%;
    gap: 10px;
`