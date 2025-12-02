import { ArrowBigLeft, Shield, Sword, WandSparkles } from 'lucide-react';
import { JSX, RefObject, useEffect, useRef, useState } from 'react';
import { UserData } from '../../../App';
import { PokemonCard } from '../../common/PokemonCard';
import { CardGrid } from '../Battle.styled';
import { selectedPokemonProps } from '../BattleSystem';
import { actionButton, playerTurn, useBattle } from './battleActions';
import { ActionsContainer, ActionsPageContainer, LogBox, LogContent, MovesetButton, MovesetContainer, TurnEventsColumn, TypingText } from './CardActions.styled';
import { StatusCardComponent } from './StatusCardComponent';

interface CardActionProps {
  user: UserData;
  enemy: UserData;
  userCard: selectedPokemonProps;
  enemyCard: selectedPokemonProps;
}

interface PokemonActionsProps {
  user: UserData;
  card: selectedPokemonProps;
  turnState: playerTurn,
  handleTurn: (action: actionButton) => void;
}


const PokemonActions = ({ user, card, turnState, handleTurn }: PokemonActionsProps) => {
  const [disableBtn, setDisableBtn] = useState(false);

  const userCard = user.battleDeck.some(p => p.uid === card.uid);

  const handleClick = async (action: actionButton) => {
    setDisableBtn(true);
    handleTurn(action);
    setDisableBtn(false);
  }

  const moves: actionButton[] = ['attack', 'defense', 'special', 'return']
  const icons: Record<string, JSX.Element | null> = {
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

  return (
    <ActionsPageContainer>
      <StatusCardComponent card={card} user={userCard} />
      <ActionsContainer>
        <PokemonCard {...{ user }} card={card} />
        <MovesetContainer>
          {moves.map((move) => {
            return (
              <MovesetButton
                disabled={disableBtn || turnState === 'enemy'}
                onClick={() => handleClick(move)}
                $color={colors[move]}
              >
                {icons[move as keyof typeof icons] ?? null} {move}
              </MovesetButton>
            )
          })}
        </MovesetContainer>
      </ActionsContainer>
    </ActionsPageContainer>
  )
}

interface TurnEventsProps {
  turnState: playerTurn;
  log: string[]
}


const TurnsEvents = ({ turnState, log }: TurnEventsProps) => {

  const contentRef = useRef<HTMLDivElement>(null);
  let color = turnState == 'user' ? '#16a34a' : "#881e1eff"
  let rotate = turnState == 'enemy' ? true : false;

  useEffect(() => {
    const container = contentRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }

  }, [log, turnState]);

  return (
    <TurnEventsColumn $rotate={rotate}>
      <div>
        <h1>{turnState == 'enemy' ? `ENEMY'S TURN` : 'YOUR TURN'}</h1>
        <ArrowBigLeft color={color} fill={color} size={72} />
      </div>
      <LogBox>
        <h4>Battle Log</h4>
        <LogContent ref={contentRef}>
          {log.map((text, i) => {
            return <TypingText key={i} $chars={text.length}>{text}</TypingText>
          })}
        </LogContent>
      </LogBox>
    </TurnEventsColumn>
  )
}

const CardActions = ({ user, userCard, enemyCard }: CardActionProps) => {

  const { log, turnState, handleTurn, userPokemon, enemyPokemon } = useBattle(userCard, enemyCard);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = contentRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }

  }, [log, turnState]);

  return (
    <div>
      {userCard && enemyCard && (
        <CardGrid>
          <PokemonActions {...{ user, turnState, handleTurn }} card={userPokemon} />
          <TurnsEvents {... { turnState, log }} />
          <PokemonActions {...{ user, turnState, handleTurn }} card={enemyPokemon} />
        </CardGrid>
      )}
    </div>
  )
}

export default CardActions