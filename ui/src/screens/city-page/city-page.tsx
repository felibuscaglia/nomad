import axios from 'axios';
import { useEffect, useState } from 'react';
import { City, RouteComponentProps } from '../../shared/interfaces';
import './city-page.scss';
import StarIcon from '@material-ui/icons/Star';
import { getCityRating } from '../../shared/utils';

interface MatchParams {
    cityId: string;
}

function CityPage(props: RouteComponentProps<MatchParams>) {
    const { cityId } = props.match.params;
    const [city, setCity] = useState<City>({} as City);

    useEffect(() => {
        axios.get<City>(`/cities/${cityId}`)
            .then(city => setCity(city.data))
            .catch(err => console.error(err));
    }, [cityId]);

    return (
        <div id='city-page'>
            <h1>{city?.name}</h1>
            <div id='rating'>
                <StarIcon className='star-icon' />
                <span>{getCityRating(city)}</span>
                <span id='country-name'>{city?.country?.name}</span>
            </div>
            <div id='cover' style={{ backgroundImage: `url(${city?.image})` }}></div>
            <h3>About {city?.name}</h3>
            <p>{city?.description}</p>
        </div>
    )
}

export default CityPage;