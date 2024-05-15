import React from 'react';
import './RiddleItem.css';

function RiddleItem({ JWT, userInfo, setGameId, riddle }) {

    const handleClick = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/newgame', {
                method: 'POST',
                headers: {
                    'Authorization' : `Bearer ${JWT}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ jwt: JWT, userId: userInfo.email, riddleId: riddle.riddleId })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const newGameId = await response.json();
            setGameId(newGameId.newGameId);
        } catch (error) {
            console.error('Failed to fetch new game ID:', error);
        }
    };

    return (
        <button onClick={handleClick} className="riddle-item">
            <div className="riddle-text">
                {riddle.riddleTitle}
            </div>
        </button>
    );
}

export default RiddleItem;
