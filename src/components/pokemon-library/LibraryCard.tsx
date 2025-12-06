import React from 'react'
import { CardDataDiv, LibraryCardContainer, LibraryCardWrapper, TypeTag } from './Library.styles'
import { useSelector } from 'react-redux'
import { RootState } from '../lib/store'
import { capitalize } from '../common/utils'
import { FetchedPokemon } from 'src/hooks/usePokemon'

interface LibraryCardProps {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedPokemon: React.Dispatch<React.SetStateAction<FetchedPokemon | null>>;
}

const LibraryCard = ({ setOpenModal, setSelectedPokemon }: LibraryCardProps) => {

    const catalog = useSelector((state: RootState) => state.library.catalog)
    const pokedexEntry = (id: number) => {
        return id < 10 ? id.toString().padStart(3, "0")
            : (id >= 10 && id < 100) ? id.toString().padStart(3, "0")
                : id
    }

    const handleClick = (pokemon: FetchedPokemon) => {
        setOpenModal(true)
        setSelectedPokemon(pokemon)
    }

    return (
        <LibraryCardContainer>
            {catalog.map(p => {
                return (
                <LibraryCardWrapper $type={p.types[0]} key={p.uid} onClick={() => handleClick(p)}>
                    <img src={p.sprite} width={100} />
                    <CardDataDiv>
                        <span>#{pokedexEntry(p.id)} {capitalize(p.name)}</span>
                        <div style={{display: 'flex', gap: '4px'}}>
                            {p.types.map((type, i) => <TypeTag key={i} $type={type}>{capitalize(type)}</TypeTag>)}
                        </div>
                    </CardDataDiv>
                </LibraryCardWrapper>)
            })}
        </LibraryCardContainer>
    )
}

export default LibraryCard