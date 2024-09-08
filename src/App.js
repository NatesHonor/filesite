import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Downloads from './downloads.js';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="menu">
          <ul>
            <li><Link to="/downloads">Downloads</Link></li>
            <li><Link to="/support">Support</Link></li>
            <li><Link to="/donate">Donate</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/downloads" element={<Downloads />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
