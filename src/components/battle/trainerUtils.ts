import { FetchedPokemon } from "../../hooks/usePokemon";
import { apiURL } from "../../utils/constants";
import { generateCardFromPokemon } from "../../utils/generateCardFromPokemon";

export const trainerPokemonGenerator = async (team?: string[] | null): Promise<FetchedPokemon[]> => {
  const response = await fetch(apiURL());
  const result = await response.json();

  if (!team?.length) return []; // no team provided

  const finalTeam = await Promise.all(
    team.map(async (pokemonName) => {
      try {
        const pokeData = result.results.find((p: any) => p.name === pokemonName);
        if (!pokeData) return null;

        const pokemonFetch = await fetch(pokeData.url).then((res) => res.json());
        const fetchedPokemon = await generateCardFromPokemon(pokemonFetch.id);
        return fetchedPokemon;
      } catch (error) {
        console.log('Cannot fetch pokemon', pokemonName, error);
        return null;
      }
    })
  );

  // filter out any nulls (failed fetches)
  return finalTeam.filter((p): p is FetchedPokemon => p !== null);
};