import React from 'react';

const NavBar = ({ number }) => (
  <nav className="navbar">
    <a className="navbar-brand" href="/">Chatty</a>
    <div className="number-connected">{ number } user(s) connected</div>
  </nav>
);

export default NavBar;