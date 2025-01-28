import React from 'react';
import Home from './views/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Campaigns from './views/Campaign';
import Sessions from './views/Session';
import SessionsDetails from './views/SessionDetails';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/"  element={<Home/>} />
          <Route path="/campaigns"  element={<Campaigns/>} />
          <Route path="/campaigns/sessions"  element={<Sessions/>} />
          <Route path="/campaigns/sessions/details"  element={<SessionsDetails/>} />
        </Routes>
    </Router>
    </>
  );
}

export default App;
