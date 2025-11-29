import { UserData } from '../../../App'
import { DivColumn, FaintedPokemonStatus, Header, PokemonBox, PokemonTray, TrainerHeaderName, TrainerPokemonStats, TrainerPokemonStatsWrapper, TrainerProfilePic, TrainerStatsContainer, TrainerStatsHeader } from './TrainerStats.styles'
import DefaultTrainer from '../../../assets/default-trainer-m.jpg';
import Pokeball from '../../../assets/pokeball2.png';

interface TrainerStatsProps {
    trainer: UserData
}

const TrainerStats = ({trainer}: TrainerStatsProps) => {
  return (
    <TrainerStatsContainer>
        <TrainerStatsHeader>
            <TrainerPokemonStatsWrapper>
                <Header>
                    <TrainerHeaderName>
                        <h1>TRAINER CARD</h1>
                        <span>{trainer.username}</span>
                    </TrainerHeaderName>
                    <div>
                        <h1>Collected cards: <span>{trainer.collection.length}</span></h1>
                        <h2>Achievements:</h2>
                    </div>
                </Header>
                <div style={{ display: 'flex', width: '100%', height: '100%', gap: '2rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px'}}>
                        <TrainerProfilePic $image={trainer.profilePicture ?? DefaultTrainer} />
                        <PokemonTray>
                            <span>Badges: </span>
                        </PokemonTray>
                    </div>

                    <DivColumn>

                        <PokemonTray>
                            {trainer.battleDeck?.map(el => {
                                return (
                                <>
                                {el.stats.hp < 50 ? (
                                    <FaintedPokemonStatus />
                                ) : (
                                    <img src={Pokeball} key={el.uid} />
                                )}
                                </>
                                )
                            })}
                        </PokemonTray>

                        <TrainerPokemonStats>
                            {trainer.battleDeck?.length > 0 && (
                                trainer.battleDeck.map(p => {
                                    return <PokemonBox $fainted={p.stats.hp < 50} $image={p.imageUrl ?? ""} key={p.uid}></PokemonBox>
                                })
                            )}
                        </TrainerPokemonStats>
                    </DivColumn>
                </div>
            </TrainerPokemonStatsWrapper>
        </TrainerStatsHeader>
    </TrainerStatsContainer>
  )
}

export default TrainerStats