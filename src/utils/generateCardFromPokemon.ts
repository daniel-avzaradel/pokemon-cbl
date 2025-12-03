import { applyFoilBoost } from '../components/shop/packLogic';
import { currentStats, FetchedPokemon, PokemonTypes, Stats } from '../hooks/usePokemon';
import { apiURL } from './constants';

export class FetchedPokemonClass {
    uid: number;
    id: number;
    name: string;
    types: PokemonTypes[];
    imageUrl: string | null;
    stats: Stats;
    currentStats: currentStats;

    constructor({ uid, id, name, types, imageUrl, stats, currentStats }: { uid: number, id: number; name: string; types: PokemonTypes[]; imageUrl: string | null; stats: Stats, currentStats: currentStats }) {
        this.uid = uid;
        this.id = id;
        this.name = name;
        this.types = types;
        this.imageUrl = imageUrl;
        this.stats = stats;
        this.currentStats = currentStats;
    }

    toJSON() {
        return {
            uid: this.uid,
            id: this.id,
            name: this.name,
            types: this.types,
            imageUrl: this.imageUrl,
            stats: this.stats,
            currentStats: this.currentStats,
        }
    }
}

export async function generateCardFromPokemon(pokemonId?: number, foil?: boolean): Promise<FetchedPokemon> {

    const id = Math.floor(Math.random() * 151);

    let pokemon: FetchedPokemonClass | null = null;

    try {
        const list = await fetch(apiURL());
        const data = await list.json();
        const results: Array<{ name: string; url: string }> = data.results || [];

        const randomPokemon = results[pokemonId ? (pokemonId - 1) : id];
        const res = await fetch(randomPokemon.url);
        const d = await res.json();

        const imageUrl = d.sprites?.other?.['official-artwork']?.front_default || null;
        const types: PokemonTypes[] = Array.isArray(d.types) ? d.types.map((t: any) => t.type.name) : [];
        const stats: Stats = {
            hp: d.stats?.find((s: any) => s.stat.name === 'hp')?.base_stat || 0,
            attack: d.stats?.find((s: any) => s.stat.name === 'attack')?.base_stat || 0,
            defense: d.stats?.find((s: any) => s.stat.name === 'defense')?.base_stat || 0,
            specialAttack: d.stats?.find((s: any) => s.stat.name === 'special-attack')?.base_stat || 0,
            specialDefense: d.stats?.find((s: any) => s.stat.name === 'special-defense')?.base_stat || 0,
            speed: d.stats?.find((s: any) => s.stat.name === 'speed')?.base_stat || 0,
        };
        pokemon = new FetchedPokemonClass({
            uid: Math.random() * 100000,
            id: d.id,
            name: d.name,
            types: types,
            imageUrl: imageUrl,
            stats: stats,
            currentStats:
            {
                hp: stats.hp,
                atk: stats.attack,
                def: stats.defense,
                spAtk: stats.specialAttack,
                spDef: stats.specialDefense,
                spd: stats.speed
            }
        });

        if (foil) {
            applyFoilBoost(pokemon.stats, 0.15)
        }

        return pokemon.toJSON();

    } catch (error) {
        throw new Error(`Failed to generate card from Pokemon ${error}`);
    }

}
