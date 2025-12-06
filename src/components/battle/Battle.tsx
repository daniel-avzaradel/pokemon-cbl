import { Swords } from 'lucide-react';
import { UserData } from '../../App';
import { BattleContainer, BattleHeader, IconWrapper, LevelContainer } from './Battle.styled';
import { TrainerCard } from './TrainerCard';

import { useState } from 'react';
import { TrainerCardI, trainersData } from './trainersData';
import { useSelector } from 'react-redux';
import { RootState } from '../lib/store';

export interface BattleProps {
  updateUser: (user: UserData) => void;
}


const Battle = ({ updateUser }: BattleProps) => {

  const [trainers, ] = useState<TrainerCardI[]>(trainersData)
  const user = useSelector((state: RootState) => state.user);

  return (
    <BattleContainer>
      <IconWrapper>
        <span>Battle</span>
        <Swords size={48} color='rgb(127, 29, 29)' />
        <span>Arena</span>
      </IconWrapper>
      <LevelContainer>
        {trainers.map((trainer: TrainerCardI, i: number) => {
          return <TrainerCard {...{ trainer, user, updateUser}} key={trainer.name + i} />
        })}
      </LevelContainer>
    </BattleContainer>
  )
}

export default Battle