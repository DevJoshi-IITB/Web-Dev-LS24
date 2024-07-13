import React from 'react';

const Header = ({ isDarkMode, toggleDarkMode }) => {
    return (
        <nav className={`navbar navbar-expand-lg ${isDarkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
            <h1 className="navbar-brand" href="#">Notes App</h1>
            <div className="form-check form-switch ">
                <input className="form-check-input" type="checkbox" id="darkModeSwitch" checked={isDarkMode} onChange={toggleDarkMode} />
                <label className="form-check-label" htmlFor="darkModeSwitch">Dark Mode</label>
            </div>
        </nav>
    );
};

export default Header;