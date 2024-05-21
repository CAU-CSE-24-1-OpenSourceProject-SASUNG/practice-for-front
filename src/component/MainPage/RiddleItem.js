import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RiddleItem.css';

function RiddleItem({ JWT, setGameId, riddle }) {
    const navigate = useNavigate();

    const handleClick = async () => {
        try {
            const response = await fetch('http://localhost:8000/newgame', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${JWT}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ riddleId: riddle.riddleId })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const newGameId = await response.json();
            setGameId(newGameId.newGameId);
            navigate(`/game/${newGameId.newGameId}`); // Navigate to the new game page
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
