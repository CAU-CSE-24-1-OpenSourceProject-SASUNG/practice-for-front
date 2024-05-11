import React from 'react';
import './UserInfo.css'; // 스타일링을 위한 CSS 파일

function UserInfo({ user }) {
    return (
        <div className="user-info">
            <img src={user.icon} alt="User Icon" className="user-icon"/>
            <div className="user-details">
                <div className="user-name">{user.nickname}</div>
                <div className="user-level">Lv. {user.level}</div>
                <div className="level-bar">
                    <div className="level-progress" style={{ width: `${user.level * 10}%` }}></div>
                </div>
            </div>
        </div>
    );
}

export default UserInfo;
