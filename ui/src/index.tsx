import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { Provider } from 'mobx-react';
import store from './store/store';

axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3000";

ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
    </Provider>,
  document.getElementById('root')
);
