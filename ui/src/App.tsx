import React from 'react';
import { Route } from 'react-router-dom';
import Header from './components/header/header';
import CityPage from './screens/city-page/city-page';
import Homepage from './screens/homepage/homepage';

function App() {
  return (
    <React.Fragment>
      <Route path='/' component={Header} />
      <Route exact path='/' component={Homepage} />
      <Route path='/city/:cityId' component={CityPage} /> 
    </React.Fragment>
  );
}

export default App;
