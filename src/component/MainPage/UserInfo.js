import React from 'react';
import './UserInfo.css'; // 스타일링을 위한 CSS 파일
import GameTicket from '../../static/icon/gameTicket.svg';
import RiddleTicket from '../../static/icon/riddleTicket.svg';

function UserInfo({ userInfo }) {
    const calculateLevel = (exp) => {
        return Math.floor(exp / 100); // 예: 100 경험치당 1 레벨
    };

    const calculateLevelProgress = (exp) => {
        return (exp % 100) / 100 * 100; // 레벨 진행도를 0-100%로 계산
    };

    const userLevel = calculateLevel(userInfo.exp);
    const levelProgress = calculateLevelProgress(userInfo.exp);

    return (
        <div className="info-group">
            <div className="user-info">
                <img src={userInfo.picture} alt="User Icon" className="user-icon"/>
                <div className="user-details">
                    <div className="user-name">{userInfo.name}</div>
                    <div className="user-level">Lv. {userLevel}</div>
                    <div className="level-bar">
                        <div className="level-progress" style={{ width: `${levelProgress}%` }}></div>
                    </div>
                </div>
            </div>
            <div className="ticket-info">
                <div className="ticket-item">
                    <img src={RiddleTicket} alt="Riddle Ticket Icon" className="ticket-icon" />
                    <span className="ticket-count">{userInfo.riddleTicket}</span>
                </div>
                <div className="ticket-item">
                    <img src={GameTicket} alt="Game Ticket Icon" className="ticket-icon" />
                    <span className="ticket-count">{userInfo.gameTicket}</span>
                </div>
            </div>
        </div>
    );
}

export default UserInfo;
