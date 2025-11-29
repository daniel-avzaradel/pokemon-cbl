import { useParams } from 'react-router-dom'
import { BattleContainer, BattleHeader, IconWrapper, PlayersGrid } from './Battle.styled'
import { Swords } from 'lucide-react'
import { useMemo } from 'react';
import { trainersData } from './trainersData';
import { UserData } from '../../App';
import TrainerStats from './trainer/TrainerStats';

interface BattleSystemInterface {
  user: UserData
}

const BattleSystem = ({ user }: BattleSystemInterface) => {

  const { id } = useParams();

  const trainer = useMemo(() => {
    return trainersData.find(el => el.id.toString() === id)
  }, [id])

  console.log(user);
  

  return (
    <BattleContainer>
      <BattleHeader>
      </BattleHeader>
      <IconWrapper>
        <span>Battle</span>
        <Swords size={60} color='rgb(127, 29, 29)' />
        <span>Arena</span>
      </IconWrapper>
      <br />

      <PlayersGrid>
        <TrainerStats trainer={user} />
        <TrainerStats trainer={user} />
      </PlayersGrid>
    </BattleContainer>
  )
}

export default BattleSystem