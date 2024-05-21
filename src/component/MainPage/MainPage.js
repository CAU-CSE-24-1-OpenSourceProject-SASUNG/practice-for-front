import React, { useState, useEffect } from 'react';
import UserInfo from './UserInfo';
import RecentButton from './RecentButton';
import RiddleList from './RiddleList';
import './MainPage.css';

function MainPage( {JWT, userInfo, setGameId} ) {
    const [riddles, setRiddles] = useState([]);

    useEffect(() => {
        const fetchRiddleItems = async () => {
            try {
                //const response = await fetch('https://newturtles.newpotatoes.org/api/riddles', {
                const response = await fetch('http://localhost:8000/riddles', {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${JWT}`
                    }
                });
                const data = await response.json();
                setRiddles(data);
            } catch (error) {
                console.error('Failed to fetch recent items:', error);
            }
        };
        fetchRiddleItems();
    }, [JWT]);


    return (
        <div className="main-page">
            <div className="main-center">
                <UserInfo userInfo={userInfo} />
                <RecentButton
                    setGameId={setGameId}
                />
            </div>
            <div className="riddle-section">
                <RiddleList
                    JWT={JWT}
                    userInfo={userInfo}
                    setGameId={setGameId}
                    riddles={riddles}
                />
            </div>
        </div>
    );
}

export default MainPage;
