import React from 'react';
import { NavLink } from 'react-router-dom';

const HomePage = () => (
  <div>
    <h1>This is the home page</h1>
    <NavLink to="/start">start</NavLink>
  </div>
);

export default HomePage;
