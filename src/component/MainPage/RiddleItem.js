import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RiddleItem.css';
import axios from "axios";

function RiddleItem({ JWT, setGameId, riddle }) {
    const navigate = useNavigate();

    const handleClick = async () => {
        axios.post('http://localhost:8000/game/new', JSON.stringify({riddleId: riddle.riddleId}), {
            headers: {
                'Authorization': `Bearer ${JWT}`,
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            const newGameId = response.data;
            setGameId(newGameId.newGameId);
            navigate(`/game/${newGameId.newGameId}`); // Navigate to the new game page
        }).catch((e) => {
            alert("새로운 게임을 만들 게임 티켓이 부족합니다!");
        })
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
