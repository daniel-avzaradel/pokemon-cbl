import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { Card, UserData } from '../../App';
import { PokemonTypes } from '../../hooks/usePokemon';
import { PokemonCard } from '../common/PokemonCard';
import { AllCardsHeader, CardContainer, CardsGrid, Section } from './MyCards.module';
import Filter from './Filter';
import SortBy from './SortBy';

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

const AllCards = ({ user, updateUser, setSelectedCard }: AllCardsProps) => {

    const [filter, setFilter] = useState<string>('');
    const [sort, setSort] = useState<string>('');

    const filteredCollection = useMemo(() => {
        const result = [...user.collection]  // clone so we never mutate the original
            .filter(card => {
                if (!filter) return true;
                return card.types.some(type => type.toLowerCase() === filter.toLowerCase());
            });

        if (sort === 'id') {
            result.sort((a, b) => a.id - b.id);
        }

        return result;

    }, [sort, filter, user.collection]);

    function handleFilterChange(value: string): void {
        if (value.toLowerCase() === 'none') {
            value = "";
        }
        setFilter(value);
    }

    function handleSort(value: string): void {
        setSort(value);
    }

    console.log(sort, filteredCollection);


    return (
        <Section>
            <AllCardsHeader>
                <h3>All Cards</h3>
                <br />
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <SortBy {...{ sort, handleSort }} />
                    <Filter {...{ filter, handleFilterChange, PokemonTypes }} />
                </div>
            </AllCardsHeader>
            <CardsGrid>
                {filteredCollection.map((card) => (
                    <CardContainer key={card.id}>
                        <PokemonCard {...{ user, updateUser }} card={card} onClick={() => setSelectedCard(card)} />
                    </CardContainer>
                ))}
            </CardsGrid>
        </Section>
    )
}

export default AllCards