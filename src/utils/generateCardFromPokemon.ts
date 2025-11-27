import { PokemonTypes, Stats, usePokemon } from '../hooks/usePokemon';

export class FetchedPokemonClass {
    id: number;
    name: string;
    types: PokemonTypes[];
    imageUrl: string | null;
    stats: Stats;

    constructor({id, name, types, imageUrl, stats}: {id: number; name: string; types: PokemonTypes[]; imageUrl: string | null; stats: Stats}) {
        this.id = id;
        this.name = name;
        this.types = types;
        this.imageUrl = imageUrl;
        this.stats = stats;
    }
}

export function generateCardFromPokemon() {
    const id = Math.floor(Math.random() * 151) + 1;

    const { pokemons } = usePokemon();

    const pokemonData = pokemons.find(p => p.id === id);

    if (!pokemonData) {
        throw new Error(`Pokemon with ID ${id} not found`);
    }

    return new FetchedPokemonClass({
        id: pokemonData.id,
        name: pokemonData.name,
        types: pokemonData.types,
        imageUrl: pokemonData.imageUrl,
        stats: pokemonData.stats
    });
  
}
