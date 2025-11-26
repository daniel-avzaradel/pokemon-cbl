import { useEffect, useState } from 'react';

export type FetchedPokemon = {
  id: number;
  name: string;
  types: string[];
  imageUrl: string | null;
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
        const listRes = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        if (!listRes.ok) throw new Error(`List fetch failed: ${listRes.status}`);
        const listData = await listRes.json();
        const results: Array<{ name: string; url: string }> = listData.results || [];

        const batchSize = 20; // avoid blasting the API all at once
        const fetched: FetchedPokemon[] = [];

        for (let i = 0; i < results.length; i += batchSize) {
          const batch = results.slice(i, i + batchSize);
          const promises = batch.map(r =>
            fetch(r.url)
              .then(res => (res.ok ? res.json() : Promise.reject(res.status)))
              .catch(() => null)
          );

          const details = await Promise.all(promises);

          details.forEach((d, idx) => {
            if (!d) return;
            const id = d.id || i + idx + 1;
            const imageUrl = d.sprites?.other?.['official-artwork']?.front_default || null;
            const types: string[] = Array.isArray(d.types) ? d.types.map((t: any) => t.type.name) : [];
            fetched.push({ id, name: d.name, types, imageUrl });
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
