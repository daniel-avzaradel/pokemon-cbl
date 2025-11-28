import { UserData } from '../../App'
import { BattleContainer, BattleHeader, IconWrapper, LevelContainer } from './Battle.styled';
import { TrainerCard } from './TrainerCard';
import { FetchedPokemon } from '../../hooks/usePokemon';
import { Swords } from 'lucide-react';
import { generateCardFromPokemon } from '../../utils/generateCardFromPokemon';

import BugCatcher from '../../../assets/bug-catcher.jpg'

interface BattleProps {
  user: UserData;
  updateUser: (user: UserData) => void;
}

export interface TrainerCardI {
  name: string;
  trainer: string;
  pokemons: FetchedPokemon[];
  profile: string;
}

const battleLevels: TrainerCardI[] = [
  {
    name: "Beginner",
    trainer: "Bug Catcher",
    pokemons: [],
    profile: BugCatcher
  },
  {
    name: "Intermediate",
    trainer: "Gym Trainer",
    pokemons: [],
    profile: ''
  },
  {
    name: "Advanced",
    trainer: "Gym Trainer",
    pokemons: [],
    profile: ''
  },
  {
    name: "Beginner",
    trainer: "Bug Catcher",
    pokemons: [],
    profile: BugCatcher
  },
  {
    name: "Intermediate",
    trainer: "Gym Trainer",
    pokemons: [],
    profile: ''
  },
  {
    name: "Advanced",
    trainer: "Gym Trainer",
    pokemons: [],
    profile: ''
  }
]

const Battle = ({ user, updateUser }: BattleProps) => {
  return (
    <BattleContainer>
      <BattleHeader>
      </BattleHeader>
      <IconWrapper>
        <Swords size={90} color='rgb(127, 29, 29)' />
        <h1>Battle Arena</h1>
      </IconWrapper>
      <LevelContainer>
        {battleLevels.map((trainer: TrainerCardI, i: number) => {
          return <TrainerCard {...trainer} key={trainer.name + i} />
        })}
      </LevelContainer>
    </BattleContainer>
  )
}

export default Battle