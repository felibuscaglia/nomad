import React from 'react';
import { Route } from 'react-router-dom';
import Header from './components/header/header';
import CityPage from './screens/city-page/city-page';
import CountryPage from './screens/country-page/country-page';
import Homepage from './screens/homepage/homepage';

function App() {
  return (
    <React.Fragment>
      <Route path='/' component={Header} />
      <Route exact path='/' component={Homepage} />
      <Route path='/city/:cityId' component={CityPage} /> 
      <Route path='/country/:countryId' component={CountryPage} />
    </React.Fragment>
  );
}

export default App;
