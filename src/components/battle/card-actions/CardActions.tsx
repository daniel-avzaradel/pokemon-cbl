import { PokemonCard } from '../../common/PokemonCard'
import { UserData } from '../../../App'
import { CardGrid } from '../Battle.styled';
import { ActionsContainer, ActionsPageContainer, LogBox, MovesetButton, MovesetContainer, TurnEventsColumn } from './CardActions.styled';
import { StatusCardComponent } from './StatusCardComponent';
import { ArrowBigLeft, Shield, Sword, WandSparkles } from 'lucide-react';
import { selectedPokemonProps } from '../BattleSystem';
import { useState } from 'react';

interface CardActionProps {
  user: UserData;
  enemy: UserData;
  userCard: selectedPokemonProps;
  enemyCard: selectedPokemonProps;
  selectedPokemonUser: selectedPokemonProps;
  selectedPokemonEnemy: selectedPokemonProps;
  setSelectedPokemonUser: React.Dispatch<React.SetStateAction<selectedPokemonProps>>
  setSelectedPokemonEnemy: React.Dispatch<React.SetStateAction<selectedPokemonProps>>
}

interface PokemonActionsProps {
  user: UserData;
  card: selectedPokemonProps;
  playerTurn: playerTurn,
  setPlayerTurn: React.Dispatch<React.SetStateAction<playerTurn>>;
  handleTurn: (action: actionButton) => void;
}

type actionButton = "attack" | "defense" | "special" | "return"

const PokemonActions = ({ user, card, playerTurn, setPlayerTurn, handleTurn }: PokemonActionsProps) => {

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
  userCard: selectedPokemonProps;
  enemyCard: selectedPokemonProps;
  playerTurn: playerTurn;
}

type playerTurn = 'user' | 'enemy'

const TurnsEvents = ({ userCard, enemyCard, playerTurn }: TurnEventsProps) => {

  let speedTurns = 0
  let turn = 'YOUR TURN'

  if (playerTurn == 'enemy') {
    turn = "ENEMY'S TURN"
  } else {
    turn = "YOUR TURN"
  }

  let color = playerTurn == 'user' ? '#16a34a' : "#881e1eff"
  let rotate = playerTurn == 'enemy' ? true : false;

  return (
    <TurnEventsColumn $rotate={rotate}>
      <>
        <h1>{turn}</h1>
        <ArrowBigLeft color={color} fill={color} size={90} />
      </>
      <LogBox>
          <h4>Battle Log</h4>
          
      </LogBox>
    </TurnEventsColumn>
  )
}

const CardActions = ({ user, userCard, enemyCard, selectedPokemonUser, selectedPokemonEnemy, setSelectedPokemonUser, setSelectedPokemonEnemy }: CardActionProps) => {

  const [playerTurn, setPlayerTurn] = useState<playerTurn>("user")
  const [log, setLog] = useState<string[]>([''])

  const handleTurn = async (action: actionButton) => {

    let userDmgAtk = selectedPokemonUser.currentStats.atk - selectedPokemonEnemy.currentStats.def
    let enemyDmgAtk = selectedPokemonEnemy.currentStats.atk - selectedPokemonUser.currentStats.def
    if (action == "attack") {

      let dmg =
        playerTurn === "user"
          ? userDmgAtk <= 0 ? 2 : userDmgAtk
          : enemyDmgAtk <= 0 ? 2 : enemyDmgAtk;

      playerTurn === 'user' ? setSelectedPokemonEnemy(prev => ({ ...prev, currentStats: { ...prev.currentStats, hp: prev.currentStats.hp - dmg } }))
        : setSelectedPokemonUser(prev => ({ ...prev, currentStats: { ...prev.currentStats, hp: prev.currentStats.hp - dmg } }))
    }

    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    await sleep(1000);
    setPlayerTurn(prev => prev === 'user' ? 'enemy' : 'user')

  }

  return (
    <>
      {userCard && enemyCard && (
        <CardGrid>
          <PokemonActions {...{ user, playerTurn, setPlayerTurn, handleTurn }} card={userCard} />
          <TurnsEvents {... { userCard, enemyCard, playerTurn, setPlayerTurn }} />
          <PokemonActions {...{ user, playerTurn, setPlayerTurn, handleTurn }} card={enemyCard} />
        </CardGrid>
      )}
    </>
  )
}

export default CardActions