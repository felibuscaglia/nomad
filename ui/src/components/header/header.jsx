import * as React from 'react';
import './header.scss';
import SearchBar from '../search-bar/search-bar';
import Logo from '../../assets/passport.png';

function Header() {
    return (
        <div id='header'>
            <div>
                <img src={Logo} id='logo' />
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