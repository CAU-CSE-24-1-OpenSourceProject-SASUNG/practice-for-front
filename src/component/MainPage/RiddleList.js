import React from 'react';
import RiddleItem from './RiddleItem';
import './RiddleList.css';
import {useNavigate} from "react-router-dom"; // 스타일링을 위한 CSS 파일

function RiddleList({ JWT, setGameId, setNewGameId, riddles }) {
    const navigate = useNavigate();
    const handleAddRiddle = () => {
        navigate('/newriddle');
    };

    return (
        <div className="riddle-list">
            <div className="riddle-header">
                <button className="add-riddle-button" onClick={handleAddRiddle}>+</button>
            </div>
            <h2>Riddles</h2>
            <hr />
            <div className="riddle-container">
                {riddles.map(riddle =>
                    <RiddleItem
                        key={riddle.riddleId}
                        JWT={JWT}
                        setGameId={setGameId}
                        riddle={riddle}
                    />
                )}
            </div>
        </div>
    );
}

export default RiddleList;
