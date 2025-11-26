import { FetchedPokemon, Stats } from '../hooks/usePokemon';

// Generate a FetchedPokemon-shaped object from either a PokeAPI-like payload
// or our simplified fetched shape. The goal is to normalize to the hook's
// shape: { id: number; name: string; types: string[]; imageUrl: string | null; stats: Stats }

export interface PokeAPIPokemon {
  id?: number;
  name?: string;
  sprites?: any;
  imageUrl?: string | null;
  types?: Array<{ slot?: number; type?: { name?: string } }>;
  stats?: Array<{ stat?: { name?: string }; base_stat?: number }>;
}

export interface FetchedPokemonShape {
  id?: number;
  name?: string;
  types?: string[];
  imageUrl?: string | null;
  stats?: Partial<Stats>;
}

function pickFirstTypeFromPoke(p: PokeAPIPokemon | FetchedPokemonShape): string[] {
  if ((p as FetchedPokemonShape).types && Array.isArray((p as FetchedPokemonShape).types) && (p as FetchedPokemonShape).types!.length > 0) {
    return (p as FetchedPokemonShape).types as string[];
  }

  if ((p as PokeAPIPokemon).types && Array.isArray((p as PokeAPIPokemon).types) && (p as PokeAPIPokemon).types!.length > 0) {
    return (p as PokeAPIPokemon).types!.map(t => (t?.type?.name ?? 'normal')).filter(Boolean) as string[];
  }

  return ['normal'];
}

export function generateCardFromPokemon(p: PokeAPIPokemon | FetchedPokemonShape): FetchedPokemon {
  const id = (p as any).id ?? Math.floor(Date.now() / 1000) + Math.floor(Math.random() * 1000);
  const name = (p as any).name ?? 'Unknown';

  const imageUrl = (p as any).imageUrl ?? (p as PokeAPIPokemon).sprites?.other?.['official-artwork']?.front_default ?? (p as PokeAPIPokemon).sprites?.front_default ?? null;

  const types = pickFirstTypeFromPoke(p);

  // Normalize stats: support either PokeAPI stats array or our simplified stats
  const statsObj: Partial<Stats> = {};
  if ((p as PokeAPIPokemon).stats && Array.isArray((p as PokeAPIPokemon).stats)) {
    (p as PokeAPIPokemon).stats!.forEach(s => {
      const statName = s?.stat?.name;
      const base = typeof s?.base_stat === 'number' ? s.base_stat : 0;
      if (statName === 'hp') statsObj.hp = base;
      if (statName === 'attack') statsObj.attack = base;
      if (statName === 'defense') statsObj.defense = base;
      if (statName === 'special-attack' || statName === 'specialAttack') statsObj.specialAttack = base;
      if (statName === 'special-defense' || statName === 'specialDefense') statsObj.specialDefense = base;
      if (statName === 'speed') statsObj.speed = base;
    });
  }

  // If provided as simplified shape, merge
  if ((p as FetchedPokemonShape).stats) {
    Object.assign(statsObj, (p as FetchedPokemonShape).stats);
  }

  const stats: Stats = {
    hp: typeof statsObj.hp === 'number' ? statsObj.hp : 50,
    attack: typeof statsObj.attack === 'number' ? statsObj.attack : 10,
    defense: typeof statsObj.defense === 'number' ? statsObj.defense : 10,
    specialAttack: typeof statsObj.specialAttack === 'number' ? statsObj.specialAttack : 10,
    specialDefense: typeof statsObj.specialDefense === 'number' ? statsObj.specialDefense : 10,
    speed: typeof statsObj.speed === 'number' ? statsObj.speed : 10
  };

  const card: FetchedPokemon = {
    id,
    name,
    types,
    imageUrl,
    stats
  };

  return card;
}
