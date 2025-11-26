import { Card } from '../App';

const cardNames = {
  fire: ['Flameon', 'Blazewing', 'Infernotail', 'Emberclaw', 'Pyroflare'],
  water: ['Aquajet', 'Tidalwave', 'Hydropulse', 'Splashfin', 'Oceanblade'],
  grass: ['Vinewhip', 'Leafstorm', 'Rosebud', 'Thornshield', 'Seedling'],
  electric: ['Voltcharge', 'Thunderbolt', 'Sparkwing', 'Zapster', 'Shockwave'],
  psychic: ['Mindblast', 'Psybeam', 'Dreamweaver', 'Telepix', 'Auraflux'],
  fighting: ['Ironpunch', 'Kickmaster', 'Brawler', 'Powerslam', 'Strikeforce'],
  normal: ['Quickpaw', 'Swifttail', 'Normalion', 'Scratcher', 'Tackler']
};

const imageUrls = {
  fire: 'https://images.unsplash.com/photo-1646215451135-f602b92c4c31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXJlJTIwZHJhZ29ufGVufDF8fHx8MTc2NDA4MzcwMHww&ixlib=rb-4.1.0&q=80&w=1080',
  water: 'https://images.unsplash.com/photo-1726795203378-ce87cd77d5e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMHR1cnRsZXxlbnwxfHx8fDE3NjQwODg0MDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
  grass: 'https://images.unsplash.com/photo-1737642836504-04d976b14db8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFzcyUyMHBsYW50JTIwbmF0dXJlfGVufDF8fHx8MTc2NDE2MDkzNHww&ixlib=rb-4.1.0&q=80&w=1080',
  electric: 'https://images.unsplash.com/photo-1532192922425-ddb527ea5096?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWdodG5pbmclMjBib2x0JTIwZWxlY3RyaWN8ZW58MXx8fHwxNzY0MTI2NDIwfDA&ixlib=rb-4.1.0&q=80&w=1080',
  psychic: 'https://images.unsplash.com/photo-1648829485880-90949475b8ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwc3ljaGljJTIwY3J5c3RhbHxlbnwxfHx8fDE3NjQxNjA5MzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
  fighting: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  normal: 'https://images.unsplash.com/photo-1638964758061-117853a20865?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2tlbW9uJTIwcGlrYWNodXxlbnwxfHx8fDE3NjQxNjA5MzR8MA&ixlib=rb-4.1.0&q=80&w=1080'
};

const types: Array<'fire' | 'water' | 'grass' | 'electric' | 'psychic' | 'fighting' | 'normal'> = [
  'fire', 'water', 'grass', 'electric', 'psychic', 'fighting', 'normal'
];

const rarities: Array<'common' | 'uncommon' | 'rare' | 'ultra-rare'> = [
  'common', 'uncommon', 'rare', 'ultra-rare'
];

export function generateRandomCard(isPremium = false, isUltra = false): Card {
  const type = types[Math.floor(Math.random() * types.length)];
  const names = cardNames[type];
  const name = names[Math.floor(Math.random() * names.length)];
  
  let rarity: 'common' | 'uncommon' | 'rare' | 'ultra-rare';
  
  if (isUltra) {
    // Ultra pack: guaranteed rare or better
    const ultraRarities: Array<'rare' | 'ultra-rare'> = ['rare', 'ultra-rare'];
    rarity = ultraRarities[Math.floor(Math.random() * ultraRarities.length)];
  } else if (isPremium) {
    // Premium pack: higher chance of rare
    const rand = Math.random();
    if (rand < 0.05) rarity = 'ultra-rare';
    else if (rand < 0.25) rarity = 'rare';
    else if (rand < 0.50) rarity = 'uncommon';
    else rarity = 'common';
  } else {
    // Basic pack: standard distribution
    const rand = Math.random();
    if (rand < 0.02) rarity = 'ultra-rare';
    else if (rand < 0.15) rarity = 'rare';
    else if (rand < 0.35) rarity = 'uncommon';
    else rarity = 'common';
  }

  const rarityMultiplier = {
    'common': 1,
    'uncommon': 1.3,
    'rare': 1.6,
    'ultra-rare': 2
  };

  const baseHp = 40 + Math.floor(Math.random() * 60);
  const baseAttack = 20 + Math.floor(Math.random() * 40);
  const baseDefense = 15 + Math.floor(Math.random() * 35);

  const multiplier = rarityMultiplier[rarity];

  return {
    id: `${type}-${name}-${Date.now()}-${Math.random()}`,
    name,
    type,
    rarity,
    hp: Math.floor(baseHp * multiplier),
    attack: Math.floor(baseAttack * multiplier),
    defense: Math.floor(baseDefense * multiplier),
    imageUrl: imageUrls[type]
  };
}

// Convert a fetched Pokemon object from the API into the app's Card shape
export function generateCardFromPokemon(pokemon: {
  id: number;
  name: string;
  types?: string[];
  imageUrl?: string | null;
}): Card {
  const typeCandidates = ['fire', 'water', 'grass', 'electric', 'psychic', 'fighting', 'normal'];
  const pokemonTypes = Array.isArray(pokemon.types) && pokemon.types.length > 0 ? pokemon.types : ['normal'];
  // choose first mapped type that exists in our type list, fallback to 'normal'
  const mappedType = pokemonTypes.map(t => t.toLowerCase()).find(t => typeCandidates.includes(t)) || 'normal';

  // Rarity heuristic: use id to spread rarities roughly (lower ids more common)
  let rarity: 'common' | 'uncommon' | 'rare' | 'ultra-rare' = 'common';
  if (pokemon.id % 97 === 0) rarity = 'ultra-rare';
  else if (pokemon.id % 23 === 0) rarity = 'rare';
  else if (pokemon.id % 5 === 0) rarity = 'uncommon';

  const rarityMultiplier = {
    'common': 1,
    'uncommon': 1.25,
    'rare': 1.6,
    'ultra-rare': 2
  };

  const baseHp = 40 + (pokemon.id % 60);
  const baseAttack = 20 + (pokemon.id % 40);
  const baseDefense = 15 + (pokemon.id % 35);

  const multiplier = rarityMultiplier[rarity];

  return {
    id: `poke-${pokemon.id}-${pokemon.name}`,
    name: pokemon.name[0].toUpperCase() + pokemon.name.slice(1),
    type: mappedType as Card['type'],
    rarity,
    hp: Math.floor(baseHp * multiplier),
    attack: Math.floor(baseAttack * multiplier),
    defense: Math.floor(baseDefense * multiplier),
    imageUrl: pokemon.imageUrl || 'https://via.placeholder.com/300?text=No+Image'
  };
}
