import React from 'react';
import './SidebarButton.css';

function SidebarButton({ label, item, setItem, isActive, setContent }) {

    const handleClick = () => {
        setContent(item);
        setItem(item);  // 현재 선택된 item을 상태로 설정
    };

    return (
        <button
            onClick={handleClick}
            className={`menu-button ${isActive ? "active" : ""}`}
        >
            { label }
        </button>
    );
}

export default SidebarButton;
