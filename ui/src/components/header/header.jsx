import './header.scss';
import SearchBar from '../search-bar/search-bar';
import ExploreIcon from '@material-ui/icons/Explore';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <div id='header'>
            <div className='header-div'>
                <Link className='link' to='/'><ExploreIcon className='logo' /></Link>
                <SearchBar />
            </div>
            <div className='header-div'>
                <Link className='link' to='/map'><div className='header-btn'>Map</div></Link>
                <div className='header-btn-active'>Advertise</div>
            </div>
        </div>
    )
}

export default Header;