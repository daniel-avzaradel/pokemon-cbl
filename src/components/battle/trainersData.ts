import { FetchedPokemon } from "../../hooks/usePokemon";

import BugCatcher from '../../assets/bug-catcher.jpg';
import Brock from '../../assets/brock.jpg';
import TeamRocket from '../../assets/team-rocket.jpg'
import Daniel from '../../assets/daniel2.png'
import Ash from '../../assets/ash.png'

export interface TrainerCardI {
  id: number;
  level: number;
  battlesWon: number;
  rewardCoins: number;
  title: string;
  difficulty: string;
  name: string;
  pokemons: FetchedPokemon[];
  profile: string;
}


export const trainersData: TrainerCardI[] = [
  {
    id: 1,
    level: 1,
    title: "Pokemon Trainer",
    difficulty: "Beginner",
    name: "Bug Catcher",
    pokemons: [],
    profile: BugCatcher,
    battlesWon: 10,
    rewardCoins: 100
  },
  {
    id: 2,
    level: 3,
    title: "Bandit Trainers",
    difficulty: "Intermediate",
    name: "Team Rocket",
    pokemons: [],
    profile: TeamRocket,
    battlesWon: 10,
    rewardCoins: 100
  },
  {
    id: 3,
    level: 5,
    title: "Gym Trainer",
    difficulty: "Advanced",
    name: "Brock",
    pokemons: [],
    profile: Brock,
    battlesWon: 10,
    rewardCoins: 100
  },
  {
    id: 4,
    level: 20,
    title: "Tournament Champion",
    difficulty: "Champion",
    name: "Ash Ketchum",
    pokemons: [],
    profile: Ash,
    battlesWon: 10,
    rewardCoins: 100
  },
  {
    id: 5,
    level: 50,
    title: "Webmaster",
    difficulty: "Legendary",
    name: "Daniel Avzaradel",
    pokemons: [],
    profile: Daniel,
    battlesWon: 10,
    rewardCoins: 100
  },
]