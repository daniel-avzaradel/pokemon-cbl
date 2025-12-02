import { Swords } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BattleContainer, IconWrapper, PlayersGrid } from './Battle.styled';
import { UserData } from '../../App';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../library/store';
import { useBattleRedux } from '../library/battleActionsRedux';
import { setUserPokemon, setEnemyPokemon, startBattle } from '../library/battleSlice';
import CardActions from './card-actions/CardActions';
import LoadingBattle from './LoadingBattle';
import TrainerStats from './trainer/TrainerStats';
import { TrainerCardI, trainersData } from './trainersData';
import { useNPCs } from './npcs/useNpcs';

export const BattleSystem = () => {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const userFromState = location.state?.user as UserData | undefined;
  const trainerFromState = location.state?.trainer as TrainerCardI | undefined;

  const trainerData = trainerFromState ?? trainersData.find(t => t.id.toString() === id);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [fullTrainer, setFullTrainer] = useState<UserData | null>(null);


  const { userPokemon, enemyPokemon, turnState, log, handleTurn } = useBattleRedux();

  useEffect(() => {
    if (!userFromState || !trainerData) return;

    const loadTrainerAndSetPokemons = async () => {
      setLoading(true);
      try {
        // Fetch full trainer with pokemon deck
        const fetchedTrainer = await useNPCs({
          username: trainerData.name,
          coins: trainerData.rewardCoins ?? 0,
          pokemon: trainerData.pokemons ?? [],
          imageUrl: trainerData.profile ?? '',
        });
        setFullTrainer(fetchedTrainer);

        // Get first Pokémon for user and enemy
        const userPokemonToSet = userFromState.battleDeck[0];
        const enemyPokemonToSet = fetchedTrainer.battleDeck[0];

        if (!userPokemonToSet || !enemyPokemonToSet) {
          throw new Error("No Pokémon available for battle");
        }

        // Dispatch to Redux
        dispatch(setUserPokemon({
          ...userPokemonToSet,
          currentStats: {
            hp: userPokemonToSet.stats.hp,
            atk: userPokemonToSet.stats.attack,
            def: userPokemonToSet.stats.defense,
            spAtk: userPokemonToSet.stats.specialAttack,
            spDef: userPokemonToSet.stats.specialDefense,
            spd: userPokemonToSet.stats.speed,
          }
        }));

        dispatch(setEnemyPokemon({
          ...enemyPokemonToSet,
          currentStats: {
            hp: enemyPokemonToSet.stats.hp,
            atk: enemyPokemonToSet.stats.attack,
            def: enemyPokemonToSet.stats.defense,
            spAtk: enemyPokemonToSet.stats.specialAttack,
            spDef: enemyPokemonToSet.stats.specialDefense,
            spd: enemyPokemonToSet.stats.speed,
          }
        }));

        // Start battle
        dispatch(startBattle());
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadTrainerAndSetPokemons();
  }, [dispatch, trainerData, userFromState]);

  const userFainted = userPokemon?.currentStats.hp! <= 0;
  const enemyFainted = enemyPokemon?.currentStats.hp! <= 0;

  useEffect(() => {
    if (userFainted) console.log("USER FAINTED!");
  }, [userFainted]);

  useEffect(() => {
    if (enemyFainted) console.log("ENEMY FAINTED!");
  }, [enemyFainted]);

  // Wait until Redux has Pokémon
  if (loading) return <LoadingBattle />;
  if (error) {
    toast.error("Failed to load battle data");
    return <Navigate to="/battle" replace />;
  }
  if (!userPokemon || !enemyPokemon) return <LoadingBattle />;

  return (
    <BattleContainer>
      <IconWrapper>
        <span>Battle</span>
        <Swords size={60} color='rgb(127, 29, 29)' />
        <span>Arena</span>
      </IconWrapper>

      <PlayersGrid>
        <TrainerStats selectedPokemon={userPokemon} trainer={userFromState!} />
        <TrainerStats selectedPokemon={enemyPokemon} trainer={fullTrainer!} />
      </PlayersGrid>

      <CardActions
        {...{ log, turnState, handleTurn }}
        user={userFromState!}
        userCard={userPokemon}
        enemyCard={enemyPokemon}
      />
    </BattleContainer>
  );
};