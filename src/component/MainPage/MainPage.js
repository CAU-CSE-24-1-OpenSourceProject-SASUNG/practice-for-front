import React, { useState, useEffect } from 'react';
import UserInfo from './UserInfo';
import RecentButton from './RecentButton';
import RiddleList from './RiddleList';
import './MainPage.css';

function MainPage( {user, setGameId} ) {
    const [riddles, setRiddles] = useState([]);

    useEffect(() => {
        const fetchRiddleItems = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/riddles');
                const data = await response.json();
                setRiddles(data);
            } catch (error) {
                console.error('Failed to fetch recent items:', error);
            }
        };
        fetchRiddleItems();
    }, []);


    return (
        <div className="main-page">
            <div className="main-center">
                <UserInfo user={user} />
                <RecentButton />
            </div>
            <div className="riddle-section">
                <RiddleList
                    user={user}
                    setGameId={setGameId}
                    riddles={riddles}
                />
            </div>
        </div>
    );
}

export default MainPage;
