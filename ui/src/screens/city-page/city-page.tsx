import axios from 'axios';
import { useEffect, useState } from 'react';
import { Ad, City, CityPillars, RouteComponentProps, SubPillar } from '../../shared/interfaces';
import './city-page.scss';
import StarIcon from '@material-ui/icons/Star';
import { getCityRatingForPage, getPillarIcon } from '../../shared/utils';
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
    const [subPillars, setSubPillars] = useState<SubPillar[]>([]);
    const [selectedPillar, setSelectedPillar] = useState<CityPillars>({} as CityPillars);

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

    function getID(index: number): string | undefined {
        if (index === 1) return 'first';
        else if (index === city?.pillars?.length - 2) return 'last';
    }

    function getIcon(cityPillar: CityPillars) {
        if (cityPillar.score === 5) return <RemoveCircle onClick={() => setPillarDetails(cityPillar)} className='neutral' />
        else if (cityPillar.score > 5) return <CheckCircle onClick={() => setPillarDetails(cityPillar)} className='check' />;
        else return <Cancel onClick={() => setPillarDetails(cityPillar)} className='negative' />
    }

    function setPillarDetails(cityPillar: CityPillars) {
        const pillar = cityPillar.pillar;
        setDialogOpen(true);
        setSelectedPillar(cityPillar);

        axios.get<SubPillar[]>(`/sub-pillars/${cityId}/${pillar.id}`)
            .then(subPillarsDTO => setSubPillars(subPillarsDTO.data))
            .catch(err => console.error(err));
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
                            <span>{getPillarIcon(cityPillar.pillar?.name)} {cityPillar.pillar?.name}</span>
                            <StyledTooltip title={'🔍 Details'} placement='top'>
                                {getIcon(cityPillar)}
                            </StyledTooltip>
                        </div>
                    )
                })}
            </div>
            <SubPillarPopup open={dialogOpen} subPillars={subPillars} cityPillar={selectedPillar} onClose={() => setDialogOpen(false)} getID={getID} />
            <div id='ads-wrapper'>
                {ads?.map((ad, index) => <AdComponent ad={ad} key={index} />)}
            </div>
            <JobSalaryCalculator entityID={cityId} entityName={city?.name} entityType={'city'} />
        </div>
    )
}

export default inject('store')(observer(CityPage));