import { City } from '../../shared/interfaces';
import './city-preview.scss';
import Rating from '@material-ui/lab/Rating';
import { Link } from 'react-router-dom';
import { getCityRating } from '../../shared/utils';

interface CityPreviewProps {
    city: City;
}

function CityPreview(props: CityPreviewProps) {

    return (
        <div id='city-preview'>
            <Link to={`/city/${props?.city?.id}`}><div id='image' style={{ backgroundImage: `url(${props?.city?.image})` }}></div></Link>
            <div id='data'>
                <div id='names'>
                    <Link id='link' to={`/city/${props?.city?.id}`}><h3>{props?.city?.name}</h3></Link>
                    <span>{props?.city?.country?.name}</span>
                </div>
                <Rating name="read-only" value={getCityRating(props?.city)} readOnly size={'small'} />
            </div>
        </div>
    )
}

export default CityPreview;