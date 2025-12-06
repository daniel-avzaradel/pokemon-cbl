import React from 'react'
import { ImageHolder, ModalButton, ModalContentContainer, ModalContentGrid, ModalPageContainer } from './Library.styles'
import { FetchedPokemon } from 'src/hooks/usePokemon';
import { Navigate } from 'react-router-dom';

interface ModalProps {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    selectedPokemon: FetchedPokemon | null
}

const Modal = ({ selectedPokemon, setOpenModal }: ModalProps) => {

    const handleClick = () => setOpenModal(false)
    if(!selectedPokemon) return <Navigate to="/library" replace />

    return (
        <ModalPageContainer onClick={handleClick}>
            <ModalContentContainer onClick={(e) => e.stopPropagation()}>
                <ModalContentGrid>
                    <ImageHolder $img={selectedPokemon.imageUrl} />
                </ModalContentGrid>
                <ModalButton onClick={handleClick}>Close</ModalButton>
            </ModalContentContainer>
        </ModalPageContainer>
    )
}

export default Modal