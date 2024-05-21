import React from 'react';
import './SidebarButton.css';

function SidebarButton({ title, gameId, setGameId, isActive, navigate }) {
    const handleClick = () => {
        setGameId(gameId);
        navigate(`/game/${gameId}`);
    };

    return (
        <button
            onClick={handleClick}
            className={`menu-button ${isActive ? "active" : ""}`}
        >
            {title}
        </button>
    );
}

export default SidebarButton;
