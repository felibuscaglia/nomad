import { Country } from '../../shared/interfaces';
import './country-preview.scss';

export interface CountryPreviewProps {
    country: Country;
}

function CountryPreview(props: CountryPreviewProps) {
    return (
        <div id='preview'>
            <div id='country-image' style={{ backgroundImage: `url(${props?.country?.image})` }}></div>
            <div>
                <span>{props?.country?.name}</span>
            </div>
        </div>
    )
}

export default CountryPreview;