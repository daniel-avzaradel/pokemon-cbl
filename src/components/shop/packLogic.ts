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
    price: 200,
    cardCount: 4,
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
    id: 4,
    tag: 'master',
    name: 'Master Pack',
    price: 1000,
    cardCount: 10,
    description: 'Contains 10 cards with two guaranteed rares'
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
  const getStatSum = (p: FetchedPokemon) =>
    Object.values(p.stats).reduce((a, b) => a + b, 0);

  const generateValidPokemon = async (
    condition: (sum: number) => boolean,
    maxAttempts = 500
  ) => {
    let attempts = 0;
    let pokemon = await generateCardFromPokemon();
    let sum = getStatSum(pokemon);

    while (!condition(sum) && ++attempts < maxAttempts) {
      pokemon = await generateCardFromPokemon();
      sum = getStatSum(pokemon);
    }

    return pokemon;
  };

  // Core pack generator:
  const generatePack = async (
    forcedRares: number,      // guaranteed rares count (e.g. 2 for pack 4)
    rareChance: number,       // % chance to get an extra rare while filling
    rareMaxStats: number,     // max stat sum allowed for a rare
    minNormalStats: number,   // minimum stat sum for normal cards
    foilChance: number,       // % chance a card becomes foil (applied after creation)
    legendaryChance = 0       // % chance to spawn a legendary (only used for pack 4)
  ) => {
    const rares: Card[] = [];
    const normals: Card[] = [];

    // 1) Forced guaranteed rares
    for (let i = 0; i < forcedRares; i++) {
      const rare = await generateValidPokemon(
        (s) => s >= 280 && s <= rareMaxStats
      );
      console.log('RARE', rare.name, getStatSum(rare));
      rares.push(rare);
    }

    // 2) Optional legendary for pack 4 (put at start of `rares` if created)
    if (pack.id === 4 && legendaryChance > 0 && Math.random() * 100 <= legendaryChance) {
      const legendaryCard = await generateValidPokemon((s) => s >= 550);
      // put legendary at the very start so it stays before the guaranteed rares
      console.log('LEGENDARY!', legendaryCard.name, getStatSum(legendaryCard));
      rares.unshift(legendaryCard);
    }

    // 3) Fill the rest of the pack
    while (rares.length + normals.length < pack.cardCount) {
      // Try to produce an extra rare with rareChance
      if (Math.random() * 100 <= rareChance) {
        const extraRare = await generateValidPokemon(
          (s) => s >= 280 && s <= rareMaxStats
        );
        rares.push(extraRare);
        continue;
      }

      // Otherwise produce a normal card that must be <= 500 stats
      const normal = await generateValidPokemon((s) => s >= minNormalStats && s <= rareMaxStats);
      normals.push(normal);
    }

    // 4) Apply foil to cards (after generation), using foilChance
    const all = [...rares, ...normals];
    for (const c of all) {
      if (Math.random() * 100 <= foilChance) {
        c.isFoil = true;
        c.stats = applyFoilBoost(c.stats, 0.15);
      }
    }

    return all;
  };

  // call generatePack per pack id — minimal changes, await each
  let cards: Card[] = [];

  if (pack.id === 1) {
    cards = await generatePack(1, /*rareChance*/ 2.5, /*rareMax*/ 340, /*minNormal*/ 250, /*foil*/ 2, /*legendary*/ 0);
  }

  if (pack.id === 2) {
    cards = await generatePack(1, 5, 380, 260, 2, 0);
  }

  if (pack.id === 3) {
    cards = await generatePack(1, 7.5, 420, 300, 3, 0);
  }

  if (pack.id === 4) {
    // GUARANTEED minimum 2 rares (forcedRares = 2)
    // allow a small rareChance to possibly add extras, legendaryChance e.g. 1%
    cards = await generatePack(2, 12, 500, 340, 4, 2);
  }

  return cards;
};