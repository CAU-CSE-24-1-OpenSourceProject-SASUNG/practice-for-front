import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import SidebarButton from './SidebarButton';
import MainButton from './MainButton';

function Sidebar({gameId, setGameId, isOpen, setIsOpen }) {
    const [showContent, setShowContent] = useState(true); // 컨텐츠 표시 상태 관리
    const [recentGames, setRecentGames] = useState([]);

    useEffect(() => {
        const fetchRecentGames = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/recentgames');
                const recentGames = await response.json();
                setRecentGames(recentGames);
            } catch (error) {
                console.error('Failed to fetch recent items:', error);
            }
        };
        fetchRecentGames();
    }, []);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                setShowContent(true);
            }, 400); // 0.5초 후에 내용을 표시
        } else {
            setShowContent(false);
        }
    }, [isOpen]); // isOpen이 변경될 때마다 이 효과를 실행

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
            <button onClick={toggleSidebar} className="toggle-button">
            </button>
            {showContent && (
                <div className="sidebar-content">
                    <MainButton
                        gameId={"main"}
                        setGameId={setGameId}
                        isActive={gameId === "main"}
                    />
                    <div className="recent-content">
                        <p className="recent-text">Recent</p>
                        {recentGames.map(item => (
                            <SidebarButton
                                key={item.id}
                                title={item.title}
                                gameId={item.id}
                                setGameId={setGameId}
                                isActive={gameId=== item.id}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Sidebar;
