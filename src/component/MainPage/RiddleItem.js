import React from 'react';
import './RiddleItem.css'; // 스타일링을 위한 CSS 파일
function RiddleItem({ riddle }) {
    return (
        <div className="riddle-item">
            {riddle.text}
        </div>
    );
}

export default RiddleItem;
