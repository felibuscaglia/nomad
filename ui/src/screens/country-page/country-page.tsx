import { useEffect, useState } from 'react';
import { Country, RouteComponentProps } from '../../shared/interfaces';
import './country-page.scss';
import axios from 'axios';
import { Cancel, CheckCircle } from '@material-ui/icons';
import store from '../../store/store';
import { observer, inject } from 'mobx-react';
import JobSalaryCalculator from '../../components/job-salary-calculator/job-salary-calculator';
import CityPreview from '../../components/city-preview/city-preview';
import LoadingScreen from '../loading-screen/loading-screen';
import ClimateTable from '../../components/climate-table/climate-table';
import CountryPreview from '../../components/country-preview/country-preview';

interface MatchParams {
    countryId: string;
}

function CountryPage(props: RouteComponentProps<MatchParams>) {
    const { countryId } = props?.match?.params;
    const [country, setCountry] = useState<Country>({} as Country);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        axios.get<Country>(`/countries/${countryId}`)
            .then(countryDTO => {
                setCountry(countryDTO.data);
                setLoading(false);
            })
            .catch(err => console.error(err));

        store.getAllJobs();

    }, [countryId]);

    function getIcon(item: boolean) {
        return item ? <CheckCircle className='check' /> : <Cancel className='negative' />
    }

    if (loading) {
        return <LoadingScreen />
    }

    return (
        <div id='container'>
            <div id='cover' style={{ backgroundImage: `url(${country.image})` }}>
                <h1>{country?.emojiFlag} {country?.name}</h1>
            </div>
            <h3>About {country?.name}</h3>
            <p>{country?.description}</p>
            <div id='pillars-wrapper'>
                <div className='pillar'>
                    <span>Independent</span>
                    {getIcon(country?.independent)}
                </div>
                <div className='pillar' id='first'>
                    <span>🇺🇳 UN Member</span>
                    {getIcon(country?.unMember)}
                </div>
                <div className='pillar'>
                    <span>Currency</span>
                    {country?.currency}
                </div>
                <div className='pillar'>
                    <span>Capital</span>
                    {country?.capital}
                </div>
                <div className='pillar'>
                    <span>Region</span>
                    {country?.region}
                </div>
                <div className='pillar'>
                    <span>Subregion</span>
                    {country?.subregion}
                </div>
                <div className='pillar'>
                    <span>Language(s)</span>
                    {country?.languages}
                </div>
                <div className='pillar'>
                    <span>Landlocked</span>
                    {getIcon(country?.landlocked)}
                </div>
                <div className='pillar'>
                    <span>Area</span>
                    {country?.area?.toLocaleString()} km²
                </div>
                <div className='pillar'>
                    <span>Population</span>
                    {country?.population?.toLocaleString()}
                </div>
                <div className='pillar'>
                    <span>🇺🇸 Travel Advice</span>
                    {country?.uaAdvise ?? 'N/A'}
                </div>
                <div className='pillar'>
                    <span>🇨🇦 Travel Advice</span>
                    {country?.caAdvise ?? 'N/A'}
                </div>
            </div>
            <JobSalaryCalculator entityID={countryId} entityName={country?.name} entityType={'country'} />
            <h3>Weather in {country?.name}</h3>
            <ClimateTable weatherData={country?.weather} />
            {country?.cities?.length !== 0 && <h3>Cities</h3>}
            {country?.cities?.length !== 0 &&
                <div className='cities-container'>
                    {country.cities?.map((city, i) => <CityPreview key={i} city={city} />)}
                </div>
            }
            <h3>{country?.name} neighbors</h3>
            <div id='neighbors-wrapper'>
                {country?.neighbors?.map((neighbor, i) => <CountryPreview country={neighbor} key={i} />)}
            </div>
        </div>
    )
}

export default inject('store')(observer(CountryPage));