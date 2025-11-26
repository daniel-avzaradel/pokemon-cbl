import { ActionButton, AllCardsHeader, CardContainer, CardsGrid, Section } from './MyCards.module'
import { PokemonCard } from '../common/PokemonCard'
import { Card, UserData } from '../../App';
import { Plus, Star } from 'lucide-react';
import styled from 'styled-components';
import { useMemo, useState } from 'react';
import { PokemonTypes } from '../../hooks/usePokemon';

interface AllCardsProps {
    user: UserData;
    updateUser: (user: UserData) => void;
    addToDeck: (card: Card) => void;
    setSelectedCard: (card: Card) => void;
}

export const FilterSelect = styled.select`
    display: flex;
    align-items: center;
    padding: 0.1rem 0.5rem;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    font-size: 0.95rem;
    background-color: white;
    cursor: pointer;
                
    &:hover {
        border-color: #b0b0b0;
    }
                
    &:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
    }
`;

const AllCards = ({ user, updateUser, addToDeck, setSelectedCard }: AllCardsProps) => {

    const [filter, setFilter] = useState<string>('');
    const filteredCollection = useMemo(() => {
        if (filter === '' || filter === 'none') return user.collection;
        return user.collection.filter(card => card.types.includes(filter as any));
    }, [filter, user.collection]);

    const isInDeck = (cardId: number) => {
        return user.battleDeck.some(card => card.id === cardId);
    };


    function handleFilterChange(value: string): void {
        if (value.toLowerCase() === 'none') {
            value = "";
        }
        setFilter(value);
    }

    return (
        <Section>
            <AllCardsHeader>
                <h3>All Cards</h3>
                <br />
                <div style={{ display: 'flex', height: 'auto', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: 'white', float: 'right' }}>Filter by type:</span>
                    <FilterSelect onChange={(e) => handleFilterChange(e.target.value)} value={filter}>
                        <option value="none">None</option>
                        {PokemonTypes.map((type, i: number) => (
                            <option key={type+i} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                        ))}
                    </FilterSelect>
                </div>
            </AllCardsHeader>
            <CardsGrid>
                {filteredCollection.map((card) => (
                    <CardContainer key={card.id}>
                        <PokemonCard {...{ user, updateUser }} card={card} onClick={() => setSelectedCard(card)} />
                        {!isInDeck(card.id) && user.battleDeck.length < 6 && (
                            <ActionButton
                                $variant="add"
                                onClick={() => addToDeck(card)}
                            >
                                <Plus /> Add to deck
                            </ActionButton>
                        )}
                    </CardContainer>
                ))}
            </CardsGrid>
        </Section>
    )
}

export default AllCards