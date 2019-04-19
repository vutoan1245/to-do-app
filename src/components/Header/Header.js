import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <header className="header-container">
            <div className="header-bar">
                    <h1><Link to="/">LOGO</Link></h1>

                    <nav>
                        <Link to="/addtask">Add Task</Link>
                        {/* <Link to="/Services">Services</Link> */}
                    </nav>

                    <button className="logout-button">Logout</button>
            </div>
        </header>
    );
};

export default Header;