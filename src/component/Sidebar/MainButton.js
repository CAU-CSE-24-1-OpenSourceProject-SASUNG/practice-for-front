import React from 'react';
import './MainButton.css';
import Logo from '../../static/icon/logo.svg';

function MainButton({ gameId, setGameId, isActive, navigate }) {
    const handleClick = () => {
        setGameId(gameId);
        navigate('/main');
    };

    return (
        <button
            onClick={handleClick}
            className={`main-button ${isActive ? 'active' : ''}`}
        >
            <img className="logo" src={Logo} alt="Logo" />
        </button>
    );
}

export default MainButton;
