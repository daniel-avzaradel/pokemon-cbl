import React from 'react'
import { DivColumn, ImageHolder, ModalButton, ModalContentContainer, ModalContentGrid, ModalDataHeader, ModalPageContainer, ModalPokemonDataDiv, StatsBarContainer, StatsBarFill, StatsBarLabel, StatsBarRow, StatsBarTrack, StatsBarValue, StatsGrid, TypeTag } from './Library.styles'
import { FetchedPokemon } from 'src/hooks/usePokemon';
import { Navigate } from 'react-router-dom';
import { capitalize, pokedexEntry } from '../common/utils';
import { Star } from 'lucide-react';

interface ModalProps {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    selectedPokemon: FetchedPokemon | null
}

const LibraryModal = ({ selectedPokemon, setOpenModal }: ModalProps) => {

    const handleClick = () => setOpenModal(false)
    if (!selectedPokemon) return <Navigate to="/library" replace />

    const statusArray = [
        { label: 'HP', value: selectedPokemon.stats.hp, color: '#f87171' },
        { label: 'ATK', value: selectedPokemon.stats.attack, color: '#eab308' },
        { label: 'DEF', value: selectedPokemon.stats.defense, color: '#60a5fa' },
        { label: 'SP ATK', value: selectedPokemon.stats.specialAttack, color: '#a78bfa' },
        { label: 'SP DEF', value: selectedPokemon.stats.specialDefense, color: '#34d399' },
        { label: 'SPD', value: selectedPokemon.stats.speed, color: '#fb923c' }
    ]

    const totalStats = statusArray.map(e => e.value).reduce((prev, cur) => prev + cur);

    const rarity = totalStats >= 550 ? 6 : totalStats >= 500 ? 5 : totalStats >= 450 ? 4 : totalStats >= 400 ? 3 : totalStats >= 350 ? 3 : totalStats >= 300 ? 2 : 1

    return (
        <ModalPageContainer onClick={handleClick}>
            <ModalContentContainer onClick={(e) => e.stopPropagation()} $type={selectedPokemon.types[0]}>
                <ModalContentGrid $img={selectedPokemon.imageUrl ?? ""}>
                    <div></div>
                    <ModalPokemonDataDiv>
                        <ModalDataHeader>
                            <img src={selectedPokemon.sprite ?? ""} />
                            <DivColumn>
                                <span>Pokedex Entry: #{pokedexEntry(selectedPokemon.id)}</span>
                                <span>Name: {capitalize(selectedPokemon.name)}</span>
                            </DivColumn>
                        </ModalDataHeader>
                        <ModalDataHeader style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <DivColumn style={{ display: 'flex', width: '100%', height: '100%' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    {selectedPokemon.types.length > 1 ? 'Types' : 'Type'}:
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        {selectedPokemon.types.map((type, i) => <TypeTag key={i} $type={type}>{capitalize(type)}</TypeTag>)}
                                    </div>
                                </div>
                                <br />
                                <div style={{ display: "flex", width: '100%', justifyContent: 'space-between' }}>
                                    <span>Total Stats: {totalStats} </span>
                                    <div style={{ display: 'flex', gap: '2px', flexDirection: 'row-reverse' }}>
                                        {Array.from({ length: rarity }, (_, index) => index + 1).map((i) => {
                                            return <Star key={i} fill={i > 5 ? '#d100b8' : 'goldenrod'} />
                                        })}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', width: '100%', height: '100%' }}>
                                    <StatsGrid style={{ display: 'flex', flex: 1, height: '100%' }}>
                                        <StatsBarContainer>
                                            {statusArray.map(stat => (
                                                <StatsBarRow key={stat.label}>
                                                    <StatsBarLabel>{stat.label}</StatsBarLabel>
                                                    <StatsBarTrack>
                                                        <StatsBarFill $width={Math.min(stat.value, 100)} $color={stat.color} />
                                                    </StatsBarTrack>
                                                    <StatsBarValue $color={stat.color}>{stat.value}</StatsBarValue>
                                                </StatsBarRow>
                                            ))}
                                        </StatsBarContainer>
                                    </StatsGrid>
                                </div>
                            </DivColumn>
                        </ModalDataHeader>
                        <ModalButton onClick={handleClick}>Close</ModalButton>
                    </ModalPokemonDataDiv>
                </ModalContentGrid>
            </ModalContentContainer>
        </ModalPageContainer>
    )
}

export default LibraryModal