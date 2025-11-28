import { ButtonContainer, CardsGrid, CardWrapper, ContinueButton, Modal, ModalContent, ModalHeader, ModalTitle } from './Shop.styles'
import { Sparkles } from 'lucide-react'
import { PokemonCard } from '../common/PokemonCard'
import { FetchedPokemon } from '../../hooks/usePokemon'
import { UserData } from '../../App';

import PokeBall from '../../assets/pokeball.png'

interface ModalProps {
    revealedCards: FetchedPokemon[];
    user: UserData;
    closePackOpening: () => void;
    loading: boolean;
}

const ModalComponent = ({ revealedCards, user, loading, closePackOpening }: ModalProps) => {
    return (
        <Modal>
            {loading ? (<img src={PokeBall} width={90} />) : (
                <ModalContent>

                <ModalHeader>
                    <ModalTitle>
                        <Sparkles style={{ width: '2rem', height: '2rem' }} />
                        <h2 style={{ margin: 0 }}>Pack Opened!</h2>
                        <Sparkles style={{ width: '2rem', height: '2rem' }} />
                    </ModalTitle>
                </ModalHeader>

                <CardsGrid>
                    {revealedCards.map((card, index) => (
                        <CardWrapper key={card.id + '-' + index} $delay={index * 0.2}>
                            <PokemonCard {...{ user }} card={card} />
                        </CardWrapper>
                    ))}
                </CardsGrid>

                <ButtonContainer>
                    <ContinueButton onClick={closePackOpening} $delay={revealedCards.length * 0.2}>
                        Continue
                    </ContinueButton>
                </ButtonContainer>

            </ModalContent>
            )}
        </Modal>
    )
}

export default ModalComponent