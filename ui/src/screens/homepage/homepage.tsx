import './homepage.scss';
import MapIcon from '@material-ui/icons/Map';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { City, Country } from '../../shared/interfaces';
import RoomIcon from '@material-ui/icons/Room';
import CountryPreview from '../../components/country-preview/country-preview';

function Homepage() {
    const [mainCity, setMainCity] = useState<City>({} as City);
    const [countries, setCountries] = useState<Country[]>([]);

    useEffect(() => {
        axios.get('/cities/gallery')
            .then(cities => setMainCity(cities.data))
            .catch(err => console.error(err));

        axios.get('/countries/random')
            .then(countries => setCountries(countries.data))
            .catch(err => console.error(err))
    }, [])

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
                <div id='image-div'>
                    <div id='city-image' style={{ backgroundImage: `url(${mainCity?.image})` }}></div>
                    <span id='location'><RoomIcon id='room-icon' /><b>{mainCity?.name}</b>, {mainCity?.country?.name}</span>
                </div>
            </div>
            <div id='countries'>
                <h3>Explore cities by country</h3>
                <div id='country-preview-container'>
                    {countries.map((country, index) => <CountryPreview country={country} key={index} />)}
                </div>
            </div>
        </div>
    )
}

export default Homepage;