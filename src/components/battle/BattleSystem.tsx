import { Swords } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { UserData } from '../../App';
import { BattleContainer, BattleHeader, IconWrapper, PlayersGrid } from './Battle.styled';
import { trainersData } from './trainersData';

import { toast } from 'react-toastify';
import { FetchedPokemon } from '../../hooks/usePokemon';
import CardActions from './card-actions/CardActions';
import LoadingBattle from './LoadingBattle';
import { useNPCs } from './npcs/useNpcs';
import TrainerStats from './trainer/TrainerStats';

import PokeballStar from '../../assets/star.png'

interface BattleSystemInterface {
  user: UserData
}

const BattleSystem = ({ user }: BattleSystemInterface) => {

  const { id } = useParams();
  const [enemy, setEnemy] = useState<UserData>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [selectedPokemonUser, setSelectedPokemonUser] = useState<FetchedPokemon>(user.battleDeck[0])
  const [selectedPokemonEnemy, setSelectedPokemonEnemy] = useState<FetchedPokemon | undefined>(user.battleDeck[0])
  

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
        setSelectedPokemonEnemy(npc?.battleDeck[0])

      } catch (err) {
        setError(true);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, (Math.random() * 0) + 0)
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
      <div>
        <PlayersGrid>
          <TrainerStats selectedPokemon={selectedPokemonUser} trainer={user} />
          <TrainerStats selectedPokemon={selectedPokemonEnemy} trainer={enemy} />
          <img src={PokeballStar} width={180} />
        </PlayersGrid>
        <CardActions {...{ user }} userCard={selectedPokemonUser} enemyCard={selectedPokemonEnemy ?? selectedPokemonUser} />
      </div>
      )}
    </BattleContainer>
  )
}

export default BattleSystem