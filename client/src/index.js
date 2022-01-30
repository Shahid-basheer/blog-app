import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom'
import { ContextProvider } from './Context/Context';

ReactDOM.render(
  <React.StrictMode>
  <Router>
  <ContextProvider>
  <App />
  </ContextProvider>
  </Router>
  </React.StrictMode>,
  document.getElementById('root')
);


