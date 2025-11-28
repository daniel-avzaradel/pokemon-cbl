import { Card } from "../../App";
import { generateCardFromPokemon } from "../../utils/generateCardFromPokemon";

export interface BoosterPack {
  id: number;
  tag: string;
  name: string;
  price: number;
  cardCount: number;
  description: string;
}

export const boosterPacks: BoosterPack[] = [
  {
    id: 1,
    tag: 'basic',
    name: 'Basic Pack',
    price: 100,
    cardCount: 3,
    description: 'Contains 3 random cards with common chances'
  },
  {
    id: 2,
    tag: 'great',
    name: 'Great Pack',
    price: 250,
    cardCount: 6,
    description: 'Contains 4 cards with one higher rare chances'
  },
  {
    id: 3,
    tag: 'ultra',
    name: 'Ultra Pack',
    price: 500,
    cardCount: 5,
    description: 'Contains 5 cards with higher rare chance'
  },
  {
    id: 3,
    tag: 'master',
    name: 'Master Pack',
    price: 1000,
    cardCount: 10,
    description: 'Contains 10 cards with one guaranteed rare'
  }
];

export const OpeninBoosterPack = async (pack: BoosterPack) => {

    let cards: Card[] = [];
    let rarity: number;

    let chance = Math.random() * 100;
    
    if(pack.id === 1) {
        while(cards.length < pack.cardCount) {
          let pokemon = await generateCardFromPokemon();
          rarity = pokemon ? Object.values(pokemon.stats).reduce((a, b) => a + b, 0) : 0;
          if(chance <= 5) {
              while(rarity < 320) {
                  pokemon = await generateCardFromPokemon();
                  rarity = pokemon ? Object.values(pokemon.stats).reduce((a, b) => a + b, 0) : 0;
              }
              console.log(pokemon.name + ' RARE');
              cards.push(pokemon);
              chance = Math.random() * 100;
            } else if(rarity < 280) {
                cards.push(pokemon);
            }
        }
        
    }

    if(pack.id === 2) {
        while(cards.length < pack.cardCount) {
            let pokemon = await generateCardFromPokemon();
            rarity = pokemon ? Object.values(pokemon.stats).reduce((a, b) => a + b, 0) : 0;
            if(rarity < 360) {
                cards.push(pokemon);
            }
        }
        
    }

    if(pack.id === 3) {
        while(cards.length < pack.cardCount) {
            let pokemon = await generateCardFromPokemon();
            let rares = 0;
            rarity = pokemon ? Object.values(pokemon.stats).reduce((a, b) => a + b, 0) : 0;
            if(rarity > 360 && rares < 1) {
              cards.push(pokemon);
              rares += 1;
            }
            if(rarity < 360) {
                cards.push(pokemon);
            }
        }
        
    }
    
    return cards;

}