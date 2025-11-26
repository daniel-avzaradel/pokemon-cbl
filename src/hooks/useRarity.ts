import { FetchedPokemon } from "./usePokemon";

export function useRarity(pokemon: FetchedPokemon) {

    const stats = pokemon.stats;
    const totalStats = stats.hp + stats.attack + stats.defense + stats.specialAttack + stats.specialDefense + stats.speed;

    if (totalStats >= 500) {
        return 'legendary';
    } else if (totalStats >= 400) {
        return 'epic';
    } else if (totalStats >= 300) {
        return 'rare';
    } else {
        return 'common';
    }

};