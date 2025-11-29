import { User } from "../../../hooks/useTrainer";
import { apiURL } from "../../../utils/constants";
import { generateCardFromPokemon } from "../../../utils/generateCardFromPokemon";
import { TeamProps } from "../trainerUtils";
import { PokemonRoot } from "./jsonTypes";

interface NPCProps {
    username: string;
    coins: number;
    pokemon: TeamProps[];
    imageUrl?: string;
}

export interface Root {
  count: number
  next: string
  previous: any
  results: Result[]
}

export interface Result {
  name: string
  url: string
}

export async function useNPCs({ username, coins, pokemon, imageUrl }: NPCProps) {

  let trainer = new User({ username, coins, profilePicture: imageUrl });
  let pokemons: Root = await fetch(apiURL()).then(res => res.json());

  await Promise.all(
    pokemon.map(async (p) => {
      try {
        let find = pokemons.results.find(pok => pok.name === p.name);
        if (find) {
          let pokemonData: PokemonRoot = await fetch(find.url).then(res => res.json());
          let final = await generateCardFromPokemon(pokemonData.id);
          trainer.addCardToDeck(final);
        }
      } catch (error) {
        throw new Error("Error while fetching Pokemon");
      }
    })
  );

  return trainer;
}