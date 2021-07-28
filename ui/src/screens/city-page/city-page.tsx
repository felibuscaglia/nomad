import axios from 'axios';
import { useEffect, useState } from 'react';
import { Ad, City, CityPillars, RouteComponentProps } from '../../shared/interfaces';
import './city-page.scss';
import StarIcon from '@material-ui/icons/Star';
import { getCityRatingForPage } from '../../shared/utils';
import { CheckCircle, Cancel, RemoveCircle, Report } from '@material-ui/icons';
import Tooltip from '@material-ui/core/Tooltip';
import _ from 'lodash';
import { withStyles } from '@material-ui/core';
import AdComponent from '../../components/homepage-ad/homepage-ad';

interface MatchParams {
    cityId: string;
}

function CityPage(props: RouteComponentProps<MatchParams>) {
    const { cityId } = props.match.params;
    const [city, setCity] = useState<City>({} as City);
    const [ads, setAds] = useState<Ad[]>([]);

    useEffect(() => {
        axios.get<City>(`/cities/${cityId}`)
            .then(city => setCity(city.data))
            .catch(err => console.error(err));

        axios.get<Ad[]>('/ads')
            .then(ads => setAds(ads.data))
            .catch(err => console.error(err));
    }, [cityId]);

    const StyledTooltip = withStyles((theme) => ({
        tooltip: {
            fontFamily: "-apple-system,BlinkMacSystemFont,'Inter UI','Roboto',sans-serif",
            fontSize: theme.typography.pxToRem(12),
        },
    }))(Tooltip);

    function getID(index: number) {
        if (index === 1) return 'first';
        else if (index === city?.pillars?.length - 2) return 'last';
    }

    function getIconAndTooltip(cityPillar: CityPillars) {
        const score = cityPillar?.score / cityPillar?.voteCount;
        if (_.isNaN(score)) return 'N/A';
        else return (
            <StyledTooltip title={`${score} ${score === 1 ? 'point' : 'points'} out of ${cityPillar?.voteCount} votes received.`} placement='top'>
                {getIcon(score)}
            </StyledTooltip>
        )
    }

    function getIcon(score: number) {
        if (score === 2.5) return <RemoveCircle className='neutral' />
        else if (score > 2.5) return <CheckCircle className='check' />;
        else return <Cancel className='negative' />
    }

    return (
        <div id='city-page'>
            <div id='first-div'>
                <div>
                    <h1>{city?.name}</h1>
                    <div id='rating'>
                        <StarIcon className='star-icon' />
                        <span>{getCityRatingForPage(city)}</span>
                        <span id='country-name'>{city?.country?.name}</span>
                    </div>
                </div>
                <button><Report /> Report this city data</button>
            </div>
            <div id='cover' style={{ backgroundImage: `url(${city?.image})` }}></div>
            <h3>About {city?.name}</h3>
            <p>{city?.description}</p>
            <h3>City Pillars</h3>
            <div id='pillars-wrapper'>
                {city?.pillars?.map((cityPillar, index) => {
                    return (
                        <div className='pillar' id={getID(index)} key={index}>
                            <span>{cityPillar.pillar?.name}</span>
                            {getIconAndTooltip(cityPillar)}
                        </div>
                    )
                })}
            </div>
            <div id='ads-wrapper'>
                {ads?.map(ad => <AdComponent ad={ad} />)}
            </div>
        </div>
    )
}

export default CityPage;