import { Card } from "../../App";
import { generateCardFromPokemon } from "../../utils/generateCardFromPokemon";

export interface BoosterPack {
  id: number;
  name: string;
  price: number;
  cardCount: number;
  description: string;
}

export const boosterPacks: BoosterPack[] = [
  {
    id: 1,
    name: 'Basic Pack',
    price: 100,
    cardCount: 3,
    description: 'Contains 3 random cards with common chances'
  },
  {
    id: 2,
    name: 'Ultra Pack',
    price: 250,
    cardCount: 5,
    description: 'Contains 5 cards with higher rare chance'
  },
  {
    id: 3,
    name: 'Master Pack',
    price: 500,
    cardCount: 6,
    description: 'Contains 6 cards with one guaranteed rare'
  }
];

export const OpeninBoosterPack = async (pack: BoosterPack) => {

    let cards: Card[] = [];
    let rarity: number;

    if(pack.id === 1) {
        while(cards.length < pack.cardCount) {
            let pokemon = await generateCardFromPokemon();
            rarity = pokemon ? Object.values(pokemon.stats).reduce((a, b) => a + b, 0) : 0;
            if(rarity < 280) {
                cards.push(pokemon);
            }
        }
        
    }
    if(pack.id === 2) {
        while(cards.length < pack.cardCount) {
            let pokemon = await generateCardFromPokemon();
            rarity = pokemon ? Object.values(pokemon.stats).reduce((a, b) => a + b, 0) : 0;
            if(rarity < 400) {
                cards.push(pokemon);
            }
        }
        
    }
    
    return cards;

}