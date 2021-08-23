import './search-bar.scss';
import axios from 'axios';
import { useState, ChangeEvent, useRef, useEffect } from 'react';
import { QueryResults } from '../../shared/interfaces';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import { Link } from 'react-router-dom';

function SearchBar() {
    const ref = useRef<any>();
    const [showResults, setShowResults] = useState<boolean>(true);
    const [results, setResults] = useState<QueryResults[]>([]);

    useEffect(() => {
        const checkIfClickedOutside = (e: MouseEvent) => {
            if (showResults && ref.current && !ref.current.contains(e.target as Node)) {
                setShowResults(false)
            } else {
                setShowResults(true);
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    })

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
        const value = e.target.value;
        if (value !== '') {
            await searchFnDebounced(e.target.value);
        } else {
            setResults([]);
        }
    }

    return (
        <div id='search-bar-wrapper'>
            <input
                id='search-bar'
                placeholder='Discover your new destination...'
                onChange={(e) => handleTextChange(e)}
                autoComplete='off'
                ref={ref}
            />
            {showResults &&
                <div id='results'>
                    {results.map((result, i) => {
                        return (
                            <Link
                                ref={ref}
                                key={i}
                                to={typeof result.image === 'string' ? `/country/${result.id}` : `/city/${result.id}`}
                                className='result'
                                onClick={() => setResults([])}
                            >
                                <div id='city-image' style={{ backgroundImage: `url(${typeof result.image === 'string' ? result.image : result.image?.image})` }}></div>
                                <span>{result.name}</span>
                            </Link>
                        )
                    })}
                </div>}
        </div>
    )
}

export default SearchBar;