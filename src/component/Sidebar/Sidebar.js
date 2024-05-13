import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import SidebarButton from './SidebarButton';
import MainButton from './MainButton';

function Sidebar({ setContent, isOpen, setIsOpen }) {
    const [showContent, setShowContent] = useState(true); // 컨텐츠 표시 상태 관리
    const [selectedItem, setSelectedItem] = useState('main');
    const [recentItems, setRecentItems] = useState([]);

    useEffect(() => {
        const fetchRecentItems = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/recent');
                const data = await response.json();
                setRecentItems(data);
            } catch (error) {
                console.error('Failed to fetch recent items:', error);
            }
        };
        fetchRecentItems();
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
                        item="main"
                        setItem={setSelectedItem}
                        isActive={selectedItem === "main"}
                        setContent={setContent}
                    />
                    <div className="recent-content">
                        <p className="recent-text">Recent</p>
                        {recentItems.map(item => (
                            <SidebarButton
                                key={item.id}
                                label={item.label}
                                item={item.id}
                                setItem={setSelectedItem}
                                isActive={selectedItem === item.id}
                                setContent={setContent}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Sidebar;
