import { ArrowBigLeft, Shield, Sword, WandSparkles } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
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
  playerTurn: playerTurn,
  handleTurn: (action: actionButton) => void;
}


const PokemonActions = ({ user, card, playerTurn, handleTurn }: PokemonActionsProps) => {

  let userCard = user.battleDeck.some(p => p.uid === card.uid)

  return (
    <ActionsPageContainer>
      <PokemonCard {...{ user }} card={card} />
      <ActionsContainer>
        <StatusCardComponent card={card} user={userCard} />
        <MovesetContainer>
          <MovesetButton onClick={() => handleTurn('attack')}><Sword /> Attack</MovesetButton>
          <MovesetButton onClick={() => handleTurn('defense')} $color='royalblue'><Shield /> Defense</MovesetButton>
          <MovesetButton onClick={() => handleTurn('special')} $color='darkorange'><WandSparkles /> Special</MovesetButton>
          <MovesetButton onClick={() => handleTurn('attack')} $color='#000'>Return</MovesetButton>
        </MovesetContainer>
      </ActionsContainer>
    </ActionsPageContainer>
  )
}

interface TurnEventsProps {
  playerTurn: playerTurn;
  log: string[]
}


const TurnsEvents = ({ playerTurn, log }: TurnEventsProps) => {

  const contentRef = useRef<HTMLDivElement>(null);

  let speedTurns = 0
  let turn = 'YOUR TURN'

  if (playerTurn == 'enemy') {
    turn = "ENEMY'S TURN"
  } else {
    turn = "YOUR TURN"
  }

  let color = playerTurn == 'user' ? '#16a34a' : "#881e1eff"
  let rotate = playerTurn == 'enemy' ? true : false;

  useEffect(() => {
    const container = contentRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [log]);

  return (
    <TurnEventsColumn $rotate={rotate}>
      <>
        <h1>{turn}</h1>
        <ArrowBigLeft color={color} fill={color} size={90} />
      </>
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

  const { log, playerTurn, handleTurn, userPokemon, enemyPokemon } = useBattle(userCard, enemyCard);

  return (
    <>
      {userCard && enemyCard && (
        <CardGrid>
          <PokemonActions {...{ user, playerTurn, handleTurn }} card={userPokemon} />
          <TurnsEvents {... { userCard, enemyCard, playerTurn, log }} />
          <PokemonActions {...{ user, playerTurn, handleTurn }} card={enemyPokemon} />
        </CardGrid>
      )}
    </>
  )
}

export default CardActions