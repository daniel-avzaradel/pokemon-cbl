import { ArrowBigLeft, Shield, Sword, WandSparkles } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { UserData } from '../../../App';
import { PokemonPoof } from '../../../utils/SmokeBomb';
import { PokemonCard } from '../../common/PokemonCard';
import { selectedPokemonProps } from '../../library/battleSlice';
import { CardGrid } from '../Battle.styled';
import {
  ActionsContainer,
  ActionsPageContainer,
  LogBox,
  LogContent,
  MovesetButton,
  MovesetContainer,
  TurnEventsColumn,
  TypingText
} from './CardActions.styled';
import { StatusCardComponent } from './StatusCardComponent';
import { TurnState } from '../../library/battleActionsRedux';

export type actionButton = "attack" | "defense" | "special" | "return";

interface PokemonActionsProps {
  user: UserData;
  card: selectedPokemonProps;
  turnState: TurnState;
  handleTurn: (action: actionButton) => void;
  isUserCard: boolean; // true if this card belongs to player
  activeTurn: TurnState | null; // tracked locally
}

const PokemonActions = ({ user, card, turnState, handleTurn, isUserCard, activeTurn }: PokemonActionsProps) => {
  const [disableBtn, setDisableBtn] = useState(false);

  const handleClick = async (action: actionButton) => {
    if (disableBtn) return;
    setDisableBtn(true);
    try {
      await handleTurn(action);
    } finally {
      setDisableBtn(false);
    }
  };

  const moves: actionButton[] = ['attack', 'defense', 'special', 'return'];
  const icons: Record<string, React.JSX.Element | null> = {
    attack: <Sword />,
    defense: <Shield />,
    special: <WandSparkles />,
    return: null,
  };
  const colors: Record<string, string> = {
    attack: "darkred",
    defense: "darkblue",
    special: "darkorange",
    return: "#111",
  };

  const returnPokemon = card.currentStats.hp <= 0;

  // Only enable buttons if it’s this card’s turn
  const isActiveTurn = isUserCard ? activeTurn === "user-turn" : activeTurn === "enemy-turn";

  return (
    <ActionsPageContainer>
      <StatusCardComponent card={card} user={isUserCard} />
      <ActionsContainer $return={returnPokemon}>
        {returnPokemon ? (
          <div style={{ position: "relative", width: "250px", height: "250px" }}>
            <PokemonPoof />
          </div>
        ) : (
          <PokemonCard {...{ user }} card={card} />
        )}
        <MovesetContainer>
          {moves.map((move, i) => (
            <MovesetButton
              key={i}
              disabled={disableBtn || !isActiveTurn}
              $color={colors[move]}
              onClick={() => handleClick(move)}
            >
              {icons[move as keyof typeof icons] ?? null} {move}
            </MovesetButton>
          ))}
        </MovesetContainer>
      </ActionsContainer>
    </ActionsPageContainer>
  );
};

interface TurnEventsProps {
  log: string[];
  activeTurn: TurnState | null;
}

const TurnsEvents = ({ log, activeTurn }: TurnEventsProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const color = activeTurn === "user-turn" ? "#16a34a" : "#881e1eff";
  const rotate = activeTurn === "enemy-turn" ? true : false;
  const turn = activeTurn === "enemy-turn" ? "ENEMY'S TURN" : "YOUR TURN";

  useEffect(() => {
    const container = contentRef.current;
    if (container) container.scrollTop = container.scrollHeight;
  }, [log, activeTurn]);

  return (
    <TurnEventsColumn $rotate={rotate}>
      <div>
        <h1>{turn}</h1>
        <ArrowBigLeft color={color} fill={color} size={72} />
      </div>
      <LogBox>
        <h4>Battle Log</h4>
        <LogContent ref={contentRef}>
          {log.map((text, i) => (
            <TypingText key={i} $chars={text.length}>{text}</TypingText>
          ))}
        </LogContent>
      </LogBox>
    </TurnEventsColumn>
  );
};

interface CardActionProps {
  user: UserData;
  userCard: selectedPokemonProps;
  enemyCard: selectedPokemonProps;
  log: string[];
  turnState: TurnState;
  handleTurn: (action: actionButton) => void;
}

const CardActions = ({ log, turnState, handleTurn, user, userCard, enemyCard }: CardActionProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  // Track previous active turn (user-turn or enemy-turn)
  const [activeTurn, setActiveTurn] = useState<TurnState | null>("user-turn");
  useEffect(() => {
    if (turnState === "user-turn" || turnState === "enemy-turn") {
      setActiveTurn(turnState);
    }
    // else keep previous activeTurn
  }, [turnState]);

  useEffect(() => {
    const container = contentRef.current;
    if (container) container.scrollTop = container.scrollHeight;
  }, [log, activeTurn]);

  return (
    <div>
      {userCard && enemyCard && (
        <CardGrid>
          <PokemonActions
            user={user}
            card={userCard}
            turnState={turnState}
            handleTurn={handleTurn}
            isUserCard={true}
            activeTurn={activeTurn}
          />
          <TurnsEvents log={log} activeTurn={activeTurn} />
          <PokemonActions
            user={user}
            card={enemyCard}
            turnState={turnState}
            handleTurn={handleTurn}
            isUserCard={false}
            activeTurn={activeTurn}
          />
        </CardGrid>
      )}
    </div>
  );
};

export default CardActions;
