import React from 'react';
import './RiddleItem.css'; // 스타일링을 위한 CSS 파일
function RiddleItem({ riddle }) {
    return (
        <button className="riddle-item">
            <div className="riddle-text">
                {riddle.text}
            </div>
            { }
        </button>
    );
}

export default RiddleItem;
