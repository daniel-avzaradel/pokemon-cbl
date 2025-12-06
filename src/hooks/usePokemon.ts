import { useEffect, useState } from 'react';
import { apiURL } from '../utils/constants';

export type Stats = {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
};

export type currentStats = {
  hp: number;
  atk: number;
  def: number;
  spAtk: number;
  spDef: number;
  spd: number;
};

export type PokemonTypes = 'fire' | 'water'| 'grass'| 'electric' | 'psychic' | 'fighting' | 'normal' | 'ice' | 'poison' | 'ground' | 'flying' | 'bug' | 'rock' | 'ghost' | 'dragon' | 'dark' | 'steel' | 'fairy';

export const PokemonTypes = [ 'fire', 'water', 'grass', 'electric', 'psychic', 'fighting', 'normal', 'ice', 'poison', 'ground', 'flying', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy' ] as Array<PokemonTypes>;

export type FetchedPokemon = {
  uid: number;
  id: number;
  name: string;
  types: PokemonTypes[];
  imageUrl: string | null;
  stats: Stats;
  currentStats: currentStats
  isFoil?: boolean;
  sprite?: string;
};

export function usePokemon() {
  const [pokemons, setPokemons] = useState<FetchedPokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const listRes = await fetch(apiURL());
        if (!listRes.ok) throw new Error(`List fetch failed: ${listRes.status}`);
        const listData = await listRes.json();
        const results: Array<{ name: string; url: string }> = listData.results || [];

        const batchSize = 20;
        const fetched: FetchedPokemon[] = [];

        for (let i = 0; i < results.length; i += batchSize) {
          const batch = results.slice(i, i + batchSize);
          const promises = batch.map(r =>
        fetch(r.url)
          .then(res => (res.ok ? res.json() : Promise.reject(res.status)))
          .catch(() => null)
          );
        const details = await Promise.all(promises); // Ensure details are fetched

        details.forEach((d, idx) => {
        if (!d) return;
        const uid = Math.random() * 100000;
        const id = d.id || i + idx + 1;
        const imageUrl = d.sprites?.other?.['official-artwork']?.front_default || null;
        const types: FetchedPokemon['types'] = Array.isArray(d.types) ? d.types.map((t: any) => t.type.name) : [];
        
        // Extract all stats from API
        const stats: Stats = {
          hp: 0,
          attack: 0,
          defense: 0,
          specialAttack: 0,
          specialDefense: 0,
          speed: 0
        };
        if (Array.isArray(d.stats)) {
          d.stats.forEach((s: any) => {
            const statName = s?.stat?.name;
            const baseStat = typeof s?.base_stat === 'number' ? s.base_stat : 0;
            const statKey = statName?.replace('-', '') === 'specialattack' ? 'specialAttack' :
                            statName?.replace('-', '') === 'specialdefense' ? 'specialDefense' :
                            statName;
            if (statKey && statKey in stats) stats[statKey as keyof Stats] = baseStat;
          });
        }

        fetched.push({ uid, id, name: d.name, types, imageUrl, stats, currentStats: {
          hp: stats.hp,
          atk: stats.attack,
          def: stats.defense,
          spAtk: stats.specialAttack,
          spDef: stats.specialDefense,
          spd: stats.speed
        } });
          });
        }

        if (mounted) setPokemons(fetched);
      } catch (err: any) {
        if (mounted) setError(err?.message || String(err));
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  return { pokemons, loading, error } as const;
}
