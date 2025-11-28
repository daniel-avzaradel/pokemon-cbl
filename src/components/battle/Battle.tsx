import { Swords } from 'lucide-react';
import { UserData } from '../../App';
import { FetchedPokemon } from '../../hooks/usePokemon';
import { BattleContainer, BattleHeader, IconWrapper, LevelContainer } from './Battle.styled';
import { TrainerCard } from './TrainerCard';

import { useEffect, useState } from 'react';
import { trainerPokemonGenerator } from './trainerUtils';
import { TrainerCardI, trainersData } from './trainersData';

interface BattleProps {
  user: UserData;
  updateUser: (user: UserData) => void;
}



const Battle = ({ user, updateUser }: BattleProps) => {

  const [trainers, setTrainers] = useState<TrainerCardI[]>(trainersData)

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
        <span>Battle</span>
        <Swords size={90} color='rgb(127, 29, 29)' />
        <span>Arena</span>
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