import { Ad } from '../../shared/interfaces';
import './homepage-ad.scss';
import LocationCityIcon from '@material-ui/icons/LocationCity';

interface HomepageAdProps {
    ad: Ad;
}

function HomepageAd(props: HomepageAdProps) {
    if (props?.ad?.local) {
        return (
            <div id='main-div'>
                <div id='local-ad'>
                    <div>
                        <LocationCityIcon className='logo' />
                        <span>Advertise on The Nomad Pillars</span>
                    </div>
                    <span id='advertise'>Advertise your business to the digital nomad community</span>
                    <button>$10/month</button>
                </div>
                <div id='extra-data'>
                    <h3>Advertisement</h3>
                    <span>Ad</span>
                </div>
            </div>
        )
    }
    return (
        <div>
            Hello!
        </div>
    )
}

export default HomepageAd;