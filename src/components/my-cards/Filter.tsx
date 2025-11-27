import styled from 'styled-components';
import { PokemonTypes } from '../../hooks/usePokemon';

interface FilterProps {
    handleFilterChange: (value: string) => void;
    filter: string;
    PokemonTypes: PokemonTypes[];
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

const Filter = ({ filter, handleFilterChange, PokemonTypes }: FilterProps) => {
    return (
        <div style={{ display: 'flex', height: 'auto', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: 'white', float: 'right' }}>Filter by type:</span>
            <FilterSelect onChange={(e) => handleFilterChange(e.target.value)} value={filter}>
                <option value="none">None</option>
                {PokemonTypes.map((type, i: number) => (
                    <option key={type + i} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                ))}
            </FilterSelect>
        </div>
    )
}

export default Filter