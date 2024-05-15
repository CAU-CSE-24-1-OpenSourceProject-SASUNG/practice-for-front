import React from 'react';
import './RiddleItem.css';

function RiddleItem({ JWT, userInfo, setGameId, setNewGameId, riddle }) {

    const handleClick = async () => {
        try {
//            const response = await fetch('https://newturtles.newpotatoes.org/api/newgame', {
//                method: 'POST',
//                headers: {
//                    'Authorization' : `Bearer ${JWT}`,
//                    'Content-Type': 'application/json'
//                },
//                body: JSON.stringify({ jwt: JWT, userId: userInfo.email, riddleId: riddle.riddleId })
//            });
//
//            if (!response.ok) {
//                throw new Error('Network response was not ok.');
//            }
//            const newGameId = await response.json();
//            setNewGameId(newGameId.newGameId);
//            setGameId(newGameId.newGameId);
            setGameId(riddle.riddleId);
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
