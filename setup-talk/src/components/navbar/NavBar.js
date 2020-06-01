import React from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav>
      <Link to="/">
        <img className="logo" src="https://admin.programmers.com.br/Content/images/logo-topo.png" alt=""/>
      </Link>
        <ul className="nav-links">
        </ul>
    </nav>  );
}

export default NavBar;
