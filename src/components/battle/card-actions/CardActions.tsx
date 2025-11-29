import { PokemonCard } from '../../common/PokemonCard'
import { Card, UserData } from '../../../App'
import { CardGrid } from '../Battle.styled';
import { ActionsContainer, ActionsPageContainer, MovesetButton, MovesetContainer } from './CardActions.styled';
import { StatusCardComponent } from './StatusCardComponent';
import { Shield, Sword, WandSparkles } from 'lucide-react';

interface CardActionProps {
  user: UserData;
  userCard: Card;
  enemyCard: Card;
}

interface PokemonActionsProps {
  user: UserData;
  card: Card;
}

const PokemonActions = ({ user, card }: PokemonActionsProps) => {
  return (
    <ActionsPageContainer>
      <PokemonCard {...{ user }} card={card} />
      <ActionsContainer>
        <StatusCardComponent />
        <MovesetContainer>
          <MovesetButton><Sword/> Attack</MovesetButton>
          <MovesetButton $color='royalblue'><Shield/> Defense</MovesetButton>
          <MovesetButton $color='darkorange'><WandSparkles /> Special</MovesetButton>
          <MovesetButton $color='#000'>Return</MovesetButton>
        </MovesetContainer>
      </ActionsContainer>
    </ActionsPageContainer>
  )
}

const TurnsEvents = () => {



  return (
    <div style={{ display: 'flex', borderRadius: '10px', border: '2px solid red', width: '100%', height: '100%', alignItems: 'center', padding: '2rem', justifyContent: 'center' }}>
      <h1>YOUR TURN</h1>
    </div>
  )
}

const CardActions = ({ user, userCard, enemyCard }: CardActionProps) => {
  return (
    <>
      {userCard && enemyCard && (
        <CardGrid>
          <PokemonActions {...{ user }} card={userCard} />
          <TurnsEvents />
          <PokemonActions {...{ user }} card={enemyCard} />
        </CardGrid>
      )}
    </>
  )
}

export default CardActions