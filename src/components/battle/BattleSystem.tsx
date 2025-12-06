import { Swords } from "lucide-react";
import { useEffect, useState } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { UserData } from "../../App";
import { useBattleRedux } from "../library/battleActionsRedux";
import { BattleContainer, IconWrapper, PlayersGrid } from "./Battle.styled";
import CardActions from "./card-actions/CardActions";
import LoadingBattle from "./LoadingBattle";
import {
  generateTeamFromNPCPokemons,
  useNPCs,
} from "./npcs/useNpcs";
import TrainerStats from "./trainer/TrainerStats";
import { TrainerCardI, trainersData } from "./trainersData";
import { CoinFlipOverlay } from "../common/CoinToss";
import coinFront from '/assets/pokemon-coin.png';
import coinBack from '/assets/pokemon-coin-back.png';
import { store } from "../library/store";


export const BattleSystem = () => {
  const { id } = useParams();
  const location = useLocation();

  // Player's trainer (real player)
  const userFromState = location.state?.user as UserData ?? store.getState().user;

  // Opponent trainer (maybe passed from route state)
  const trainerFromState = location.state?.trainer as TrainerCardI | undefined;

  // If not passed, try to get from trainersData array
  const trainerData =
    trainerFromState ?? trainersData.find((t) => t.id.toString() === id);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Full NPC trainer as UserData
  const [fullTrainer, setFullTrainer] = useState<UserData | null>(null);

  // ------------------------------
  // LOAD NPC TRAINER (ONE TIME)
  // ------------------------------
  useEffect(() => {
    let ignore = false;

    const loadTrainer = async () => {
      try {
        if (!trainerData) {
          setError(true);
          setLoading(false);
          return;
        }

        // CASE 1: The opponent came from navigation state (TrainerCardI)
        if (trainerFromState) {
          const team = await generateTeamFromNPCPokemons(
            trainerFromState.pokemons ?? []
          );

          if (!ignore) {
            setFullTrainer({
              username: trainerFromState.name,
              coins: trainerFromState.rewardCoins ?? 0,
              battleDeck: team,
              collection: [],
              arena: [],
              profilePicture: trainerFromState.profile ?? "",
              isNPC: true,
            });
            setLoading(false);
          }
          return;
        }

        // CASE 2: Opponent from trainersData → useNPCs
        const fetched = await useNPCs({
          username: trainerData.name,
          coins: trainerData.rewardCoins ?? 0,
          pokemon: trainerData.pokemons ?? [],
          imageUrl: trainerData.profile ?? "",
          isNPC: true,
        });

        if (!ignore) {
          setFullTrainer(fetched.toJSON());
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        if (!ignore) {
          setError(true);
          setLoading(false);
        }
      }
    };

    loadTrainer();
    return () => {
      ignore = true;
    };
  }, [trainerData, trainerFromState]);

  // ------------------------------
  // CALL BATTLE HOOK ONLY WHEN READY
  // ------------------------------

  // If trainer isn't loaded yet, avoid passing null
  const safeEnemyTrainer = fullTrainer!;

  const {
    userPokemon,
    enemyPokemon,
    turnState,
    log,
    handleTurn,
    showCoinOverlay,
    handleCoinResult
  } = useBattleRedux(userFromState, safeEnemyTrainer);

  // ------------------------------
  // RENDERING LOGIC
  // ------------------------------

  if (loading) return <LoadingBattle />;
  if (!userFromState) return <Navigate to="/login" replace />;

  if (error) {
    if (userFromState?.battleDeck.length === 0) {
      toast.error("You dont have any cards in your deck");
      return <Navigate to="/battle" replace />;
    }
    toast.error("Failed to load battle data");
    return <Navigate to="/battle" replace />;
  }

  // In case hook still preparing initial Pokémon
  if (!userPokemon || !enemyPokemon) return <LoadingBattle />;

  return (
    <BattleContainer>
      {showCoinOverlay && (
        <CoinFlipOverlay
          frontImage={coinFront}
          backImage={coinBack}
          show={showCoinOverlay}
          onResult={handleCoinResult}
        />
      )}
      <IconWrapper>
        <span>Battle</span>
        <Swords size={60} color="rgb(127, 29, 29)" />
        <span>Arena</span>
      </IconWrapper>

      <PlayersGrid>
        {/* Safe because at this point they are guaranteed defined */}
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
