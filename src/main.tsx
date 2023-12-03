import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Controlled from './pages/Controlled/Controlled';
import Uncontrolled from './pages/Uncontrolled/Uncontrolled';
import NotFound from './pages/404/404';
import './globals.css';
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/controlled" element={<Controlled />} />
          <Route path="/uncontrolled" element={<Uncontrolled />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);
