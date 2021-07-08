import './country-preview.scss';
import { CountryPreviewProps } from './interfaces';

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