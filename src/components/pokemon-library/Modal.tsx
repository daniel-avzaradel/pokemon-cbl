import React from 'react'
import { ModalContentContainer, ModalPageContainer } from './Library.styles'

interface ModalProps {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({ setOpenModal }: ModalProps) => {

    const handleClick = () => setOpenModal(false)

    return (
        <ModalPageContainer>
            <ModalContentContainer onClick={handleClick}>
                <h1>MODAL CONTENT</h1>
            </ModalContentContainer>
        </ModalPageContainer>
    )
}

export default Modal