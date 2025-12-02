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
import { useBattle } from './card-actions/battleActions';

interface BattleSystemInterface {
  user: UserData
}

export interface selectedPokemonProps extends FetchedPokemon {
  currentStats: {
    hp: number;
    atk: number;
    def: number;
    spAtk: number;
    spDef: number;
    spd: number;
  }
}

const BattleSystem = ({ user }: BattleSystemInterface) => {

  const { id } = useParams();
  const [enemy, setEnemy] = useState<UserData>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [selectedPokemonUser, setSelectedPokemonUser] = useState<selectedPokemonProps>({...user?.battleDeck[0], currentStats: {
          hp: user.battleDeck[0].stats.hp,
          def: user.battleDeck[0].stats.defense,
          atk: user.battleDeck[0].stats.attack,
          spAtk: user.battleDeck[0].stats.specialAttack,
          spDef: user.battleDeck[0].stats.specialDefense,
          spd: user.battleDeck[0].stats.speed,
        }})

  const [selectedPokemonEnemy, setSelectedPokemonEnemy] = useState<selectedPokemonProps>({...user?.battleDeck[0], currentStats: {
          hp: user.battleDeck[0].stats.hp,
          def: user.battleDeck[0].stats.defense,
          atk: user.battleDeck[0].stats.attack,
          spAtk: user.battleDeck[0].stats.specialAttack,
          spDef: user.battleDeck[0].stats.specialDefense,
          spd: user.battleDeck[0].stats.speed,
        }})

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
        setSelectedPokemonEnemy({...npc?.battleDeck[0], currentStats: {
          hp: npc.battleDeck[0].stats.hp,
          def: npc.battleDeck[0].stats.defense,
          atk: npc.battleDeck[0].stats.attack,
          spAtk: npc.battleDeck[0].stats.specialAttack,
          spDef: npc.battleDeck[0].stats.specialDefense,
          spd: npc.battleDeck[0].stats.speed,
        }})

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

  const {
    log,
    turnState,
    speedState,
    userPokemon,
    enemyPokemon,
    handleTurn
  } = useBattle(selectedPokemonUser, selectedPokemonEnemy);

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
      <IconWrapper>
        <span>Battle</span>
        <Swords size={60} color='rgb(127, 29, 29)' />
        <span>Arena</span>
      </IconWrapper>

      {(user && enemy) && (
      <div>
        <PlayersGrid>
          <TrainerStats selectedPokemon={selectedPokemonUser} trainer={user} />
          <TrainerStats selectedPokemon={selectedPokemonEnemy} trainer={enemy} />
        </PlayersGrid>
        <CardActions {...{ user, enemy, log, turnState, handleTurn }} userCard={selectedPokemonUser} enemyCard={selectedPokemonEnemy ?? selectedPokemonUser} />
      </div>
      )}
    </BattleContainer>
  )
}

export default BattleSystem