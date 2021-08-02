import { Country } from '../../shared/interfaces';
import './country-preview.scss';
import { Link } from 'react-router-dom';

export interface CountryPreviewProps {
    country: Country;
}

function CountryPreview(props: CountryPreviewProps) {
    return (
        <Link to={`/country/${props?.country?.id}`} className='links'>
            <div id='preview'>
                <div id='country-image' style={{ backgroundImage: `url(${props?.country?.image})` }}></div>
                <div>
                    <span>{props?.country?.name}</span>
                </div>
            </div>
        </Link>
    )
}

export default CountryPreview;