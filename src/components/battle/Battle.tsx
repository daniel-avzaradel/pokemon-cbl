import { Swords } from 'lucide-react';
import { UserData } from '../../App';
import { BattleContainer, BattleHeader, IconWrapper, LevelContainer } from './Battle.styled';
import { TrainerCard } from './TrainerCard';

import { useState } from 'react';
import { TrainerCardI, trainersData } from './trainersData';

export interface BattleProps {
  user: UserData;
  updateUser: (user: UserData) => void;
}


const Battle = ({ user, updateUser }: BattleProps) => {

  const [trainers, ] = useState<TrainerCardI[]>(trainersData)

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