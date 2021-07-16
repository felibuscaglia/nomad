import './header.scss';
import SearchBar from '../search-bar/search-bar';
import ExploreIcon from '@material-ui/icons/Explore';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <div id='header'>
            <div>
                <Link id='link' to='/'><ExploreIcon className='logo' /></Link>
                <SearchBar />
            </div>
            <div>
                <div className='header-btn'>Map</div>
                <div className='header-btn'>Advertise</div>
                <div className='header-btn-active'>Add a city</div>
            </div>
        </div>
    )
}

export default Header;