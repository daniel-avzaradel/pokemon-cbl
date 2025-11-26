import { FetchedPokemon, Stats } from '../hooks/usePokemon';

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Lightweight random card generator that returns the same shape as usePokemon's FetchedPokemon.
// This intentionally avoids any complex, rarity-based stat calculations and instead
// produces simple randomized stats (or zeros if you prefer deterministic values).
export function generateRandomCard(allowRare = true, includeImage = true): FetchedPokemon {
  const typesPool = ['fire', 'water', 'grass', 'electric', 'psychic', 'fighting', 'normal', 'ice', 'poison', 'ground', 'flying', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'];

  const adjectives = ['Flaming', 'Aqua', 'Leafy', 'Shock', 'Mystic', 'Mighty', 'Gentle', 'Shadow', 'Blaze', 'Frost', 'Tiny', 'Grand', 'Swift', 'Brave'];
  const species = ['Drake', 'Pup', 'Beetle', 'Toad', 'Fox', 'Sprite', 'Golem', 'Wisp', 'Hound', 'Seraph', 'Cub', 'Rex'];

  const name = `${pick(adjectives)} ${pick(species)}`;

  // numeric id to match usePokemon's FetchedPokemon
  const id = Math.floor(Date.now() / 1000) + Math.floor(Math.random() * 1000);

  // 1 or 2 types
  const primaryType = pick(typesPool);
  const hasSecond = Math.random() < 0.25; // 25% chance of a second type
  const types = hasSecond ? [primaryType, pick(typesPool)].filter((v, i, a) => a.indexOf(v) === i) : [primaryType];

  const imageUrl = includeImage ? `https://picsum.photos/seed/${encodeURIComponent(String(id))}/300/300` : null;

  // Stats: simple random values (no elaborate rarity formulas)
  const stats: Stats = {
    hp: randInt(20, 120),
    attack: randInt(5, 100),
    defense: randInt(5, 100),
    specialAttack: randInt(5, 100),
    specialDefense: randInt(5, 100),
    speed: randInt(5, 120)
  };

  const pokemon: FetchedPokemon = {
    id,
    name,
    types,
    imageUrl,
    stats
  };

  return pokemon;
}

export default generateRandomCard;
