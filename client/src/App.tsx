import React from 'react';
import {config} from './configs/config';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';

const {baseUrl} = config;

function App() {
  return (
    <Router basename={baseUrl}>
      <AppRoutes />
    </Router>
  );
}

export default App;
