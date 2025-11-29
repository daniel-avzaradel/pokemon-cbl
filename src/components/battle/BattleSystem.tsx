import { useParams } from 'react-router-dom'
import { BattleContainer, BattleHeader, IconWrapper, PlayersGrid } from './Battle.styled'
import { Swords } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react';
import { trainersData } from './trainersData';
import { UserData } from '../../App';

import TrainerStats from './trainer/TrainerStats';
import { useNPCs } from './npcs/useNpcs';

interface BattleSystemInterface {
  user: UserData
}

const BattleSystem = ({ user }: BattleSystemInterface) => {

  const { id } = useParams();
  const [enemy, setEnemy] = useState<UserData>();

  const trainer = useMemo(() => {
    return trainersData.find(el => el.id.toString() === id);
  }, [id]);

  useEffect(() => {
    if (!trainer) return;

    const load = async () => {
      const npc = await useNPCs({
        username: trainer.name,
        coins: trainer.rewardCoins,
        pokemon: trainer.pokemons,
      });
      setEnemy(npc);
    };

    load();
  }, [trainer, id]);

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

      {(user && enemy) ? (
        <PlayersGrid>
          <TrainerStats trainer={user} />
          <TrainerStats trainer={enemy} />
        </PlayersGrid>
      ) : <h1>No Data</h1>}
    </BattleContainer>
  )
}

export default BattleSystem