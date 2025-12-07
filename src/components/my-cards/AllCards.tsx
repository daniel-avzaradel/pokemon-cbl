import { useMemo, useState } from 'react';
import { Card, UserData } from '../../App';
import { PokemonTypes } from '../../hooks/usePokemon';
import { PokemonCard } from '../common/PokemonCard';
import { AllCardsHeader, CardContainer, CardsGrid, Section } from './MyCards.module';
import Filter from './Filter';
import SortBy from './SortBy';
import { toast } from 'react-toastify';

interface AllCardsProps {
    user: UserData;
    updateUser: (user: UserData) => void;
    addToDeck: (card: Card) => void;
    removeFromDeck: (cardId: number) => void;
}

const AllCards = ({ user, addToDeck, removeFromDeck, updateUser }: AllCardsProps) => {

    const [filter, setFilter] = useState<string>('');
    const [sort, setSort] = useState<string>('id');

    const filteredCollection = useMemo(() => {
        const result = [...user.collection]  // clone so we never mutate the original
            .filter(card => {
                if (!filter) return true;
                return card.types.some(type => type.toLowerCase() === filter.toLowerCase());
            });

        if (sort === 'id') {
            result.sort((a, b) => a.id - b.id);
        }

        if (sort === 'statsAsc') {
            result.sort((a, b) => Object.values(a.stats).reduce((prev, cur) => prev + cur) - Object.values(b.stats).reduce((prev, cur) => prev + cur));
        }
        if (sort === 'statsDes') {
            result.sort((a, b) => Object.values(b.stats).reduce((prev, cur) => prev + cur) - Object.values(a.stats).reduce((prev, cur) => prev + cur));
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

    const addCardToDeck = (card: Card) => {
        if(user.battleDeck.some(p => p.id === card.id)) {
            toast.warning("You cannot add the same card twice in the deck", {
                theme: 'dark'
            })
        } else {
            addToDeck(card)
        }
    }

    return (
        <Section>
            <AllCardsHeader>
                <h3>All Cards</h3>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <SortBy {...{ sort, handleSort }} />
                    <Filter {...{ filter, handleFilterChange, PokemonTypes }} />
                </div>
            </AllCardsHeader>
            <CardsGrid>
                {filteredCollection.map((card, index) => (
                    <CardContainer key={card.id + '-' + index}>
                        <PokemonCard {...{ user, updateUser, removeFromDeck, addToDeck }}
                            card={card}
                            onClick={() => addCardToDeck(card) }
                        />
                    </CardContainer>
                ))}
            </CardsGrid>
        </Section>
    )
}

export default AllCards