import axios from 'axios';
import { useEffect, useState } from 'react';
import { Ad, City, CityPillars, RouteComponentProps } from '../../shared/interfaces';
import './city-page.scss';
import StarIcon from '@material-ui/icons/Star';
import { getCityRatingForPage } from '../../shared/utils';
import { CheckCircle, Cancel, RemoveCircle, Report } from '@material-ui/icons';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core';
import AdComponent from '../../components/homepage-ad/homepage-ad';
import JobSalaryCalculator from '../../components/job-salary-calculator/job-salary-calculator';
import { inject, observer } from 'mobx-react';
import store from '../../store/store';
import SubPillarPopup from '../../components/sub-pillar-popup/sub-pillar-popup';

interface MatchParams {
    cityId: string;
}

function CityPage(props: RouteComponentProps<MatchParams>) {
    const { cityId } = props.match.params;
    const [city, setCity] = useState<City>({} as City);
    const [ads, setAds] = useState<Ad[]>([]);
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        axios.get<City>(`/cities/${cityId}`)
            .then(city => setCity(city.data))
            .catch(err => console.error(err));

        axios.get<Ad[]>('/ads')
            .then(ads => setAds(ads.data))
            .catch(err => console.error(err));

        store.getAllJobs();
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

    function getIcon(score: number) {
        const handleDialog = () => setDialogOpen(!dialogOpen);

        if (score === 5) return <RemoveCircle onClick={ handleDialog } className='neutral' />
        else if (score > 5) return <CheckCircle onClick={ handleDialog } className='check' />;
        else return <Cancel onClick={ handleDialog } className='negative' />
    }

    return (
        <div id='container'>
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
            <div id='cover' style={{ backgroundImage: `url(${city?.image?.image})` }}></div>
            <h3>About {city?.name}</h3>
            <p>{city?.description}</p>
            <h3>City Pillars</h3>
            <div id='pillars-wrapper'>
                {city?.pillars?.map((cityPillar, index) => {
                    return (
                        <div className='pillar' id={getID(index)} key={index}>
                            <span>{cityPillar.pillar?.name}</span>
                            <StyledTooltip title={'🔍 Details'} placement='top'>
                                {getIcon(cityPillar.score)}
                            </StyledTooltip>
                        </div>
                    )
                })}
            </div>
            <SubPillarPopup open={dialogOpen} />
            <div id='ads-wrapper'>
                {ads?.map((ad, index) => <AdComponent ad={ad} key={index} />)}
            </div>
            <JobSalaryCalculator entityID={cityId} entityName={city?.name} entityType={'city'} />
        </div>
    )
}

export default inject('store')(observer(CityPage));