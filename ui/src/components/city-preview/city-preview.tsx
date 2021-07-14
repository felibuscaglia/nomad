import { City } from '../../shared/interfaces';
import './city-preview.scss';
import Rating from '@material-ui/lab/Rating';


interface CityPreviewProps {
    city: City;
}

function CityPreview(props: CityPreviewProps) {

    function getRating() {
        return props?.city?.rank / props?.city?.voteCount;
    }

    return (
        <div id='city-preview'>
            <div id='image' style={{ backgroundImage: `url(${props?.city?.image})` }}></div>
            <div id='data'>
                <div id='names'>
                    <h3>{props?.city?.name}</h3>
                    <span>{props?.city?.country?.name}</span>
                </div>
                <Rating name="read-only" value={getRating()} readOnly size={'small'} />
            </div>
        </div>
    )
}

export default CityPreview;