import React from 'react';
import RiddleItem from './RiddleItem';
import './RiddleList.css'; // 스타일링을 위한 CSS 파일

function RiddleList({ JWT, userInfo, setGameId, riddles }) {
    return (
        <div className="riddle-list">
            <h2>Riddles</h2>
            <hr />
            <div className="riddle-container">
                {riddles.map(riddle =>
                    <RiddleItem
                        JWT={JWT}
                        key={riddle.riddleId}
                        userInfo={userInfo}
                        setGameId={setGameId}
                        riddle={riddle}
                    />
                )}
            </div>
        </div>
    );
}

export default RiddleList;
