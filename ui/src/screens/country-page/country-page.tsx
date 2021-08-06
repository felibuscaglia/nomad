import { useEffect, useState } from 'react';
import { Country, RouteComponentProps } from '../../shared/interfaces';
import './country-page.scss';
import axios from 'axios';
import { Cancel, CheckCircle } from '@material-ui/icons';
import store from '../../store/store';
import { observer, inject } from 'mobx-react';
import JobSalaryCalculator from '../../components/job-salary-calculator/job-salary-calculator';

interface MatchParams {
    countryId: string;
}

function CountryPage(props: RouteComponentProps<MatchParams>) {
    const { countryId } = props?.match?.params;
    const [country, setCountry] = useState<Country>({} as Country);

    useEffect(() => {
        axios.get<Country>(`/countries/${countryId}`)
            .then(countryDTO => setCountry(countryDTO.data))
            .catch(err => console.error(err));

        store.getAllJobs();

    }, [countryId])

    function getIcon(item: boolean) {
        return item ? <CheckCircle className='check' /> : <Cancel className='negative' />
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
            </div>
           <JobSalaryCalculator entityID={countryId} entityName={country?.name} entityType={'country'} />
        </div>
    )
}

export default inject('store')(observer(CountryPage));