import { UserData } from '../../../App';
import DefaultTrainer from '../../../assets/default-trainer-m.jpg';
import Pokeball from '../../../assets/pokeball2.png';
import { DivColumn, FaintedPokemonStatus, Header, PokemonBox, PokemonTray, TrainerHeaderName, TrainerPokemonStats, TrainerPokemonStatsWrapper, TrainerProfilePic, TrainerStatsContainer, TrainerStatsHeader } from './TrainerStats.styles';

import { Gem } from 'lucide-react';
import { selectedPokemonProps } from '../../library/battleSlice';

interface TrainerStatsProps {
    trainer: UserData;
    selectedPokemon?: selectedPokemonProps;
}

const TrainerStats = ({ trainer, selectedPokemon }: TrainerStatsProps) => {

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
                    <div style={{ display: 'flex', width: '100%', height: '100%', gap: '2rem', flexDirection: `${trainer.isNPC ? 'row-reverse' : 'row'}` }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <TrainerProfilePic $image={trainer.profilePicture ?? DefaultTrainer} />
                            <DivColumn>
                                <PokemonTray>
                                    <span style={{ color: 'goldenrod', fontWeight: 500 }}>BADGES: </span>
                                </PokemonTray>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
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
                                            {el.stats.hp <= 0 ? <FaintedPokemonStatus /> : <img src={Pokeball} />}
                                        </div>
                                    )
                                })}
                            </PokemonTray>

                            <TrainerPokemonStats>
                                {trainer.battleDeck?.length > 0 && (
                                    trainer.battleDeck.map((p, i) => {
                                        let fainted = p.currentStats?.hp <= 0
                                        return <PokemonBox $selected={selectedPokemon?.uid === p.uid} key={p.uid + i} $fainted={fainted} $image={p.imageUrl ?? ""} />
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