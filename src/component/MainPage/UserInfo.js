import React from 'react';
import './UserInfo.css'; // 스타일링을 위한 CSS 파일

function UserInfo({ userInfo }) {
    return (
        <div className="user-info">
            <img src={userInfo.picture} alt="User Icon" className="user-icon"/>
            <div className="user-details">
                <div className="user-name">{userInfo.name}</div>
                <div className="user-level">Lv. {userInfo.exp}</div>
                <div className="level-bar">
                    <div className="level-progress" style={{ width: `${userInfo.exp * 10}%` }}></div>
                </div>
            </div>
        </div>
    );
}

export default UserInfo;
