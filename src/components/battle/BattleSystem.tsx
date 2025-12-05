import { Swords } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserData } from '../../App';
import { useBattleRedux } from '../library/battleActionsRedux';
import { addLog, resetBattle, setEnemyPokemon, setUserPokemon, startBattle } from '../library/battleSlice';
import { AppDispatch } from '../library/store';
import { BattleContainer, IconWrapper, PlayersGrid } from './Battle.styled';
import CardActions from './card-actions/CardActions';
import LoadingBattle from './LoadingBattle';
import { useNPCs } from './npcs/useNpcs';
import TrainerStats from './trainer/TrainerStats';
import { TrainerCardI, trainersData } from './trainersData';
import { FetchedPokemon } from '../../hooks/usePokemon';

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
  const [faintedList, setFaintedList] = useState<FetchedPokemon[]>([]);

  const { userPokemon, enemyPokemon, turnState, log, handleTurn } = useBattleRedux();

  useEffect(() => {

    dispatch(resetBattle())

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
          isNPC: true
        });
        setFullTrainer(fetchedTrainer.toJSON());

        // Get first Pokémon for user and enemy
        const userPokemonToSet = userFromState.battleDeck[0];
        const enemyPokemonToSet = fetchedTrainer.toJSON().battleDeck[0];

        if (!userPokemonToSet || !enemyPokemonToSet) {
          throw new Error("No Pokémon available for battle");
        }

        // Dispatch to Redux
        dispatch(setUserPokemon(userPokemonToSet));
        dispatch(setEnemyPokemon(enemyPokemonToSet));

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

    if (!userPokemon || !enemyPokemon) return;

    const handleFaint = async (
      fainted: boolean,
      pokemon: FetchedPokemon | undefined,
      deck: FetchedPokemon[] | undefined,
      setPokemon: (p: any) => void,
      owner: "user" | "enemy"
    ) => {

      if (!fainted || !pokemon || !deck) return;

      // Compute the new fainted list without updating state yet
      const newFaintedList = [...faintedList, pokemon];

      // Filter remaining Pokémon
      const remaining = deck.filter(p => !newFaintedList.some(f => f.uid === p.uid));

      if (remaining.length === 0) {
        // Trigger toast ONCE and stop
        toast.error(`${owner === "user" ? "Your" : "Enemy"} has no Pokémon left!`);
        return;
      }

      // Pick random new Pokémon
      const randomIndex = Math.floor(Math.random() * remaining.length);
      const newPokemon = remaining[randomIndex];

      // Update state
      setFaintedList(newFaintedList);
      const delay = (ms: number) => new Promise(resolve => setTimeout(() => resolve('delay'), ms))
      let capitalize = (pokemonName: string) => pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
      dispatch(addLog(`${capitalize(pokemon.name)} fainted...`));
      await delay(1000);
      setPokemon({...newPokemon});
      await delay(1000);
      dispatch(addLog(`${capitalize(newPokemon.name)} has entered the battlefield`));
    };

    handleFaint(userFainted, userPokemon, userFromState?.battleDeck,
      p => dispatch(setUserPokemon(p)), "user");

    handleFaint(enemyFainted, enemyPokemon, fullTrainer?.battleDeck,
      p => dispatch(setEnemyPokemon(p)), "enemy");

  }, [userFainted, enemyFainted, userFromState?.battleDeck, fullTrainer?.battleDeck, dispatch]);



  // Wait until Redux has Pokémon
  if (loading) return <LoadingBattle />;
  if (error) {
    if(userFromState?.battleDeck.length === 0) {
      toast.error("You dont have any cards in your deck")
      return <Navigate to="/battle" replace />;
    }
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