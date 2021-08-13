
import './homepage.scss';
import MapIcon from '@material-ui/icons/Map';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Ad, City, Country } from '../../shared/interfaces';
import CountryPreview from '../../components/country-preview/country-preview';
import FilterListIcon from '@material-ui/icons/FilterList';
import CityPreview from '../../components/city-preview/city-preview';
import InfiniteScroll from 'react-infinite-scroll-component';
import HomepageAd from '../../components/homepage-ad/homepage-ad';

function Homepage() {
    const [countries, setCountries] = useState<Country[]>([]);
    const [cityPage, setCityPage] = useState(1);
    const [cities, setCities] = useState<(City | Ad)[]>([]);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        axios.get('/countries/random')
            .then(countries => setCountries(countries.data))
            .catch(err => console.error(err));

        getCities();
    }, []);

    function getCities() {
        if (!hasMore) return;

        axios.get<(City | Ad)[]>(`/cities/?page=${cityPage}`)
            .then(citiesData => {
                if (citiesData.data.length === 0) {
                    setHasMore(false);
                    return;
                }
                setCities(cities.concat(citiesData.data));
                setCityPage(cityPage + 1);
            })
            .catch(err => console.error(err));
    }

    function fetchData() {
        getCities();
    }

    return (
        <div>
            <div id='welcome'>
                <div id='intro'>
                    <h1>Discover <br /> your ideal destination</h1>
                    <p>
                        Find out everything you need to know before travelling anywhere as a digital nomad.
                        Navigate through thousands of crowdsourced data and find out the destination that best
                        suits your needs and preferences.
                    </p>
                    <button id='nearby-btn'><MapIcon /><span>See nearby destinations</span></button>
                </div>
                    <div id='cover'></div>
                
            </div>
            <div id='countries'>
                <h3>Explore cities by country</h3>
                <div id='country-preview-container'>
                    {countries.map((country, index) => <CountryPreview country={country} key={index} />)}
                </div>
            </div>
            <div id='around-the-world'>
                <h3>Cities around the world</h3>
                <button><FilterListIcon /> <span>Filter</span></button> 
                {/* TODO: Make this work */}
                <InfiniteScroll
                    dataLength={cities?.length}
                    next={fetchData}
                    hasMore={hasMore}
                    loader={<h4>🏙️ Loading cities...</h4>}
                    className='cities-container'
                    endMessage={ <React.Fragment></React.Fragment> }
                >
                    {cities.map((city, index) => {
                        if ('name' in city) return <CityPreview city={city} key={index} />
                        else return <HomepageAd ad={city} key={index} />
                    })}
                </InfiniteScroll>
            </div>
        </div>
    )
}

export default Homepage;