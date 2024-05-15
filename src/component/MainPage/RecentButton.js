import React from 'react';
import './RecentButton.css'; // 스타일링을 위한 CSS 파일

function RecentButton({setGameId}) {

    //가장 최근 게임 1개의 게임 아이디 가져와서 setGameId

    return (
        <div className="recent-button" onClick={() => {/* 링크 로직 */}}>
            {/* 버튼 디자인 */}
        </div>
    );
}

export default RecentButton;
