import { Card } from '../App';

const types: Card['type'][] = ['fire','water','grass','electric','psychic','fighting','normal'];
const rarities: Card['rarity'][] = ['common','uncommon','rare','ultra-rare'];

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateRandomCard(): Card {
  const hp = randInt(30, 180);
  const attack = randInt(10, 120);
  const defense = randInt(5, 100);

  const score = hp + attack + defense;
  let rarity: Card['rarity'] = 'common';
  if (score >= 350) rarity = 'ultra-rare';
  else if (score >= 250) rarity = 'rare';
  else if (score >= 160) rarity = 'uncommon';

  const type = types[Math.floor(Math.random() * types.length)];

  return {
    id: `rnd-${Date.now()}-${Math.floor(Math.random() * 100000)}`,
    name: `Wild ${type.charAt(0).toUpperCase() + type.slice(1)}`,
    type,
    rarity,
    hp,
    attack,
    defense,
    imageUrl: ''
  };
}
