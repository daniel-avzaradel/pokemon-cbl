import { FilterSelect } from './AllCards'

interface SortByProps {
    handleSort: (value: string) => void;
    sort: string;
}

const SortBy = ({ sort, handleSort }: SortByProps) => {
    return (
        <div style={{ display: 'flex', height: 'auto', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: 'white', float: 'right' }}>Sort by:</span>
            <FilterSelect onChange={(e) => handleSort(e.target.value)} value={sort}>
                <option value="none">None</option>
                <option value="id">Pokedex Entry #</option>
                <option value="element">Element</option>
            </FilterSelect>
        </div>
    )
}

export default SortBy