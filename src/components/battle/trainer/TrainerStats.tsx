import { UserData } from '../../../App'
import { DivColumn, FaintedPokemonStatus, Header, PokemonBox, PokemonTray, TrainerHeaderName, TrainerPokemonStats, TrainerPokemonStatsWrapper, TrainerProfilePic, TrainerStatsContainer, TrainerStatsHeader } from './TrainerStats.styles'
import DefaultTrainer from '../../../assets/default-trainer-m.jpg';
import Pokeball from '../../../assets/pokeball2.png';

import { Gem } from 'lucide-react';

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
                        <DivColumn>
                            <PokemonTray>
                                <span style={{color: 'goldenrod', fontWeight: 500}}>BADGES: </span>
                            </PokemonTray>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px'}}>
                                <Gem size={28} />
                                <Gem size={28} />
                                <Gem size={28} />
                                <Gem size={28} />
                                <Gem size={28} />
                                <Gem size={28} />
                            </div>
                        </DivColumn>
                    </div>

                    <DivColumn>

                        <PokemonTray>
                            {trainer.battleDeck?.map((el, i) => {
                                return (
                                <div key={el.uid + i}>
                                    {el.stats.hp < 80 ? <FaintedPokemonStatus  /> : <img src={Pokeball} />}
                                </div>
                                )
                            })}
                        </PokemonTray>

                        <TrainerPokemonStats>
                            {trainer.battleDeck?.length > 0 && (
                                trainer.battleDeck.map((p, i) => {
                                    return <PokemonBox key={p.uid + i} $fainted={p.stats.hp < 80} $image={p.imageUrl ?? ""} />
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