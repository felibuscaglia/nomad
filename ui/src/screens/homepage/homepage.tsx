import './homepage.scss';
import MapIcon from '@material-ui/icons/Map';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { City } from '../../shared/interfaces';
import RoomIcon from '@material-ui/icons/Room';

function Homepage() {

    const [mainCity, setMainCity] = useState<City>({} as City);

    useEffect(() => {
        axios.get('/cities/gallery')
            .then(cities => setMainCity(cities.data))
            .catch(err => console.error(err));
    }, [])

    console.log(mainCity, '< main city');

    return (
        <div>
            <div id='welcome'>
                <div id='intro'>
                    <h1>Discover your <br /> ideal destination</h1>
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
        </div>
    )
}

export default Homepage;