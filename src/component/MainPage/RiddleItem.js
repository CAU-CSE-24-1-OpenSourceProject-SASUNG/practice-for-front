import React from 'react';
import './RiddleItem.css';

function RiddleItem({user, setGameId, riddle }) {

    const handleClick = () => {
        const fetchNewGameId = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/newgame', {
                    method: 'POST', // HTTP 메소드 지정
                    headers: {
                        'Content-Type': 'application/json' // 컨텐츠 타입 지정
                    },
                    body: JSON.stringify({ userId: user, riddleId: riddle.id })
                });
                const newGameId = await response.json();
                return newGameId;
            } catch (error) {
                console.error('Failed to fetch newGameId : ', error);
            }
        };
        fetchNewGameId()
            .then(data => {
                    setGameId(data);
                });
    };

    return (
        <button
            onClick={handleClick}
            className="riddle-item">
            <div className="riddle-text">
                {riddle.label}
            </div>
        </button>
    );
}

export default RiddleItem;
