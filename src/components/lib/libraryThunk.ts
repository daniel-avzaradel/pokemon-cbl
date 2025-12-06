import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchedPokemon } from 'src/hooks/usePokemon';

export const fetchPokemonCatalog = createAsyncThunk(
  'library/fetchCatalog',
  async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
    const data = await response.json();

    // Map the results into your FetchedPokemon format
    const pokemonList: FetchedPokemon[] = await Promise.all(
      data.results.map(async (p: { name: string; url: string }) => {
        const res = await fetch(p.url);
        const details = await res.json();
        const imageUrl = details.sprites?.other?.['official-artwork']?.front_default || null;

        let pokemon: FetchedPokemon = {
            uid: Math.random() * 999999,
            id: details.id,
            name: details.name,
            types: details.types.map((t: any) => t.type.name),
            imageUrl,
            stats: {
                hp: details.stats?.find((s: any) => s.stat.name === 'hp')?.base_stat || 0,
                attack: details.stats?.find((s: any) => s.stat.name === 'attack')?.base_stat || 0,
                defense: details.stats?.find((s: any) => s.stat.name === 'defense')?.base_stat || 0,
                specialAttack: details.stats?.find((s: any) => s.stat.name === 'special-attack')?.base_stat || 0,
                specialDefense: details.stats?.find((s: any) => s.stat.name === 'special-defense')?.base_stat || 0,
                speed: details.stats?.find((s: any) => s.stat.name === 'speed')?.base_stat || 0,
            },
            currentStats: {
                hp: details.stats?.find((s: any) => s.stat.name === 'hp')?.base_stat || 0,
                atk: details.stats?.find((s: any) => s.stat.name === 'attack')?.base_stat || 0,
                def: details.stats?.find((s: any) => s.stat.name === 'defense')?.base_stat || 0,
                spAtk: details.stats?.find((s: any) => s.stat.name === 'special-attack')?.base_stat || 0,
                spDef: details.stats?.find((s: any) => s.stat.name === 'special-defense')?.base_stat || 0,
                spd: details.stats?.find((s: any) => s.stat.name === 'speed')?.base_stat || 0,
            },
            sprite: details.sprites.front_default || ""
        }
        return pokemon
      })
    );

    return pokemonList;
  }
);
