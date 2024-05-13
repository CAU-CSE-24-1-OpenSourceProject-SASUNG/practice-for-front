import React from 'react';
import './RiddleItem.css';

function RiddleItem({ user, setGameId, riddle }) {

    const handleClick = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/newgame', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId: user, riddleId: riddle.id })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const newGameId = await response.json();
            setGameId(newGameId.gameId);
        } catch (error) {
            console.error('Failed to fetch new game ID:', error);
        }
    };

    return (
        <button onClick={handleClick} className="riddle-item">
            <div className="riddle-text">
                {riddle.label}
            </div>
        </button>
    );
}

export default RiddleItem;
