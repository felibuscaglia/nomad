import React from 'react';
import { Route } from 'react-router-dom';
import Header from './components/header/header';

function App() {
  return (
    <React.Fragment>
      <Route path='/' component={Header} />
    </React.Fragment>
  );
}

export default App;
