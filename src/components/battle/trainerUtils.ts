import { FetchedPokemon } from "../../hooks/usePokemon";
import { apiURL } from "../../utils/constants";
import { generateCardFromPokemon } from "../../utils/generateCardFromPokemon";

export interface TeamProps {
  name: string;
  id?: string;
  foil?: boolean;
}

export const trainerPokemonGenerator = async (team?: TeamProps[] | null): Promise<FetchedPokemon[]> => {
  const response = await fetch(apiURL());
  const result = await response.json();

  if (!team?.length) return []; // no team provided

  const finalTeam = await Promise.all(
    team.map(async (pokemon) => {
      try {
        const pokeData = result.results.find((p: any) => p.name === pokemon.name);
        if (!pokeData) return null;

        const pokemonFetch = await fetch(pokeData.url).then((res) => res.json());
        const fetchedPokemon = await generateCardFromPokemon(pokemonFetch.id -1, pokemon.foil);
        return fetchedPokemon;
      } catch (error) {
        console.log('Cannot fetch pokemon', pokemon.name, error);
        return null;
      }
    })
  );
  
  // filter out any nulls (failed fetches)
  return finalTeam.filter((p): p is FetchedPokemon => p !== null);
};