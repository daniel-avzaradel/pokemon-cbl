import { Swords } from 'lucide-react';
import { UserData } from '../../App';
import { FetchedPokemon } from '../../hooks/usePokemon';
import { BattleContainer, BattleHeader, IconWrapper, LevelContainer } from './Battle.styled';
import { TrainerCard } from './TrainerCard';

import { useEffect, useState } from 'react';
import BugCatcher from '../../assets/bug-catcher.jpg';
import { trainerPokemonGenerator } from './trainerUtils';

interface BattleProps {
  user: UserData;
  updateUser: (user: UserData) => void;
}

export interface TrainerCardI {
  level: number;
  title: string;
  difficulty: string;
  name: string;
  pokemons: FetchedPokemon[];
  profile: string;
}


const battleLevels: TrainerCardI[] = [
  {
    level: 1,
    title: "Pokemon Trainer",
    difficulty: "Beginner",
    name: "Bug Catcher",
    pokemons: [],
    profile: BugCatcher
  },
  {
    level: 3,
    title: "Bandit Trainer",
    difficulty: "Intermediate",
    name: "Team Rocket Member",
    pokemons: [],
    profile: ''
  },
  {
    level: 5,
    title: "Gym Trainer",
    difficulty: "Advanced",
    name: "Gym Trainer",
    pokemons: [],
    profile: ''
  },
  {
    level: 10,
    title: "Elite Four Member",
    difficulty: "Expert",
    name: "Bug Catcher",
    pokemons: [],
    profile: BugCatcher
  },
  {
    level: 20,
    title: "Tournament Winner",
    difficulty: "Champion",
    name: "Ash Ketchum",
    pokemons: [],
    profile: ''
  },
  {
    level: 50,
    title: "Webmaster",
    difficulty: "Legendary",
    name: "Daniel Avzaradel",
    pokemons: [],
    profile: ''
  },
]

const Battle = ({ user, updateUser }: BattleProps) => {

  const [trainers, setTrainers] = useState<TrainerCardI[]>(battleLevels)

  useEffect(() => {
    const fetchTeam = async () => {
      const teamBugCatcher = await trainerPokemonGenerator(['rattata', 'caterpie', 'weedle', 'nidoran-m', 'beedrill']);
      setTrainers(prev => {
        return prev.map(t => t.name === 'Bug Catcher' ? {...t, pokemons: teamBugCatcher} : t)
      })
    };
    fetchTeam();
  }, []);

  return (
    <BattleContainer>
      <BattleHeader>
      </BattleHeader>
      <IconWrapper>
        <Swords size={90} color='rgb(127, 29, 29)' />
        <h1>Battle Arena</h1>
      </IconWrapper>
      <LevelContainer>
        {trainers.map((trainer: TrainerCardI, i: number) => {
          return <TrainerCard {...trainer} key={trainer.name + i} />
        })}
      </LevelContainer>
    </BattleContainer>
  )
}

export default Battle