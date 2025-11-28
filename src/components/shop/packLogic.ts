import { Card } from "../../App";
import { FetchedPokemon, Stats } from "../../hooks/usePokemon";
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

function applyFoilBoost(stats: Stats, boost = 0.1) {
  const result: Stats = { ...stats };
  
  for (const key in stats) {
    result[key as keyof Stats] = Math.round(stats[key as keyof typeof stats] * (1 + boost));
  }

  return result;
}

export const OpeninBoosterPack = async (pack: BoosterPack) => {

    let cards: Card[] = [];
    let rarity: (pokemon: FetchedPokemon) => number;

    let chance = Math.random() * 100;
    let foil = Math.random() * 100;
    
    if(pack.id === 1) {
        while(cards.length < pack.cardCount) {

          let pokemon = await generateCardFromPokemon();
          rarity = (pokemon) => {
            return Object.values(pokemon.stats).reduce((a, b) => a + b, 0) ?? 0;
          } 
          
          if(chance <= 5) {
              while(rarity(pokemon) < 280 || rarity(pokemon) > 400) {
                  pokemon = await generateCardFromPokemon();
              }
              console.log(pokemon.name + ' RARE', rarity);
            } else {
              while(rarity(pokemon) > 280) {
                pokemon = await generateCardFromPokemon();
              }
            }

            if(foil <= 12) {
                pokemon.isFoil = true;
                let foilStats = applyFoilBoost(pokemon.stats, 0.15);
                pokemon.stats = foilStats;
                console.log('FOIL', pokemon.name);
                foil = Math.random() * 100;
              }
            cards.push(pokemon);
        }
        
    }

    if(pack.id === 2) {
        
    }

    if(pack.id === 3) {
       
    }
    
    return cards;

}