import { Card } from "../../../App";
import { User } from "../../../hooks/useTrainer";
import { apiURL } from "../../../utils/constants";
import { generateCardFromPokemon } from "../../../utils/generateCardFromPokemon";
import { TeamProps } from "../trainerUtils";
import { PokemonRoot } from "./jsonTypes";


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

interface NPCProps {
    username: string;
    coins: number;
    pokemon: TeamProps[];
    imageUrl?: string;
    isNPC?: boolean;
}

export async function generateTeamFromNPCPokemons(pokemonList: TeamProps[]) {
  const pokemons: Root = await fetch(apiURL()).then(res => res.json());
  const outputTeam: Card[] = [];

  await Promise.all(
    pokemonList.map(async (p) => {
      try {
        const found = pokemons.results.find(pk => pk.name === p.name);
        if (!found) return;

        const pokemonData: PokemonRoot = await fetch(found.url).then(res => res.json());
        const finalCard = await generateCardFromPokemon(pokemonData.id);

        outputTeam.push(finalCard);
      } catch (e) {
        console.error("Error generating NPC team card:", e);
      }
    })
  );

  return outputTeam;
}

export async function useNPCs({ username, coins, pokemon, imageUrl, isNPC }: NPCProps) {
  const trainer = new User({ username, coins, profilePicture: imageUrl, isNPC });

  const fullTeam = await generateTeamFromNPCPokemons(pokemon);

  fullTeam.forEach(card => trainer.addCardToDeck(card));

  return trainer;
}