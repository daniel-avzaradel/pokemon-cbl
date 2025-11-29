import { Navigate, useParams } from 'react-router-dom'
import { BattleContainer, BattleHeader, IconWrapper, PlayersGrid } from './Battle.styled'
import { Swords } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react';
import { trainersData } from './trainersData';
import { UserData } from '../../App';

import TrainerStats from './trainer/TrainerStats';
import { useNPCs } from './npcs/useNpcs';
import { toast } from 'react-toastify';
import LoadingBattle from './LoadingBattle';

interface BattleSystemInterface {
  user: UserData
}

const BattleSystem = ({ user }: BattleSystemInterface) => {

  const { id } = useParams();
  const [enemy, setEnemy] = useState<UserData>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const trainer = useMemo(() => {
    return trainersData.find(el => el.id.toString() === id);
  }, [id]);

  useEffect(() => {
    if (!trainer) return;

    const load = async () => {
      try {
        setLoading(true);
        const npc = await useNPCs({
          username: trainer.name,
          coins: trainer.rewardCoins,
          pokemon: trainer.pokemons,
          imageUrl: trainer.profile
        });
        setEnemy(npc);
      } catch (err) {
        setError(true);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, (Math.random() * 2000) + 1000)
      }
    };

    load();
  }, [trainer]);

  if (!trainer) {
    return <Navigate to="/battle" replace />;
  }

  if (loading) {
    return <LoadingBattle />;
  }

  if (error || !enemy) {
    toast.error("Could not fetch data for the battle");
    return <Navigate to="/battle" replace />;
  }

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

      {(user && enemy) && (
        <PlayersGrid>
          <TrainerStats trainer={user} />
          <TrainerStats trainer={enemy} />
        </PlayersGrid>
      )}
    </BattleContainer>
  )
}

export default BattleSystem