import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Sidebar.css';
import SidebarButton from './SidebarButton';
import MainButton from './MainButton';

function Sidebar({ JWT, gameId, setGameId, isOpen, setIsOpen }) {
    const [showContent, setShowContent] = useState(true); // 컨텐츠 표시 상태 관리
    const [recentGames, setRecentGames] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecentGames = () => {
            axios.get(`${process.env.REACT_APP_API_URL}/game/list`, {
                headers: {
                    Authorization: `Bearer ${JWT}`
                }
            }).then(response => {
                setRecentGames(response.data);
            }).catch(error => {
                console.error('Failed to fetch recent items:', error);
            });
        };
        fetchRecentGames();
    }, [JWT, gameId]);

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
                        navigate={navigate}
                    />
                    <p className="recent-text">Recent</p>
                    <div className="recent-content">
                        {recentGames.map(item => (
                            <SidebarButton
                                key={item.gameId}
                                title={item.gameTitle}
                                gameId={item.gameId}
                                setGameId={setGameId}
                                isActive={gameId === item.gameId}
                                navigate={navigate}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Sidebar;
