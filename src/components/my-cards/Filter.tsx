import { FilterSelect } from './AllCards'
import { PokemonTypes } from '../../hooks/usePokemon';

interface FilterProps {
    handleFilterChange: (value: string) => void;
    filter: string;
    PokemonTypes: PokemonTypes[];
}

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