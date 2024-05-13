import React from 'react';
import './MainButton.css';
import Logo from '../../static/icon/logo.svg';

function MainButton({ item, setItem, isActive, setContent }) {
    const handleClick = () => {
        setContent(item);
        setItem(item);
    };

    return (
        <button
            onClick={handleClick}
            className={`main-button ${isActive ? 'active' : ''}`}
        >
            <img className="logo" src={Logo} alt="Logo" />  { }
        </button>
    );
}

export default MainButton;
