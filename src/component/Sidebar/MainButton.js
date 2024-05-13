import React from 'react';
import './MainButton.css';
import Logo from '../../static/icon/logo.svg';

function MainButton({ gameId, setGameId, isActive}) {
    const handleClick = () => {
        setGameId(gameId);
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
