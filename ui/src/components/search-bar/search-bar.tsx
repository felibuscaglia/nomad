import './search-bar.scss';
import axios from 'axios';
import { useState, ChangeEvent } from 'react';
import { QueryResults } from '../../shared/interfaces';
import AwesomeDebouncePromise from 'awesome-debounce-promise';

function SearchBar() {

    const [results, setResults] = useState<QueryResults[]>([]);

    async function searchForCitiesAndCountries(query: string) {
        try {
            const { data } = await axios.get<QueryResults[]>(`/cities/search/city?query=${query}`);
            setResults(data);
        } catch (err) {
            setResults([]);
        }
    }

    const searchFnDebounced = AwesomeDebouncePromise(searchForCitiesAndCountries, 500);

    async function handleTextChange(e: ChangeEvent<HTMLInputElement>) {
        await searchFnDebounced(e.target.value);
    }

    return (
        <div id='search-bar-wrapper'>
            <input
                id='search-bar'
                placeholder='Discover your new destination...'
                onChange={(e) => handleTextChange(e)}
                autoComplete='off'
            />
            <div id='results'>
                {results.map(result => <span>{result.name}</span>)}
            </div>
        </div>
    )
}

export default SearchBar;