import React, { useState, useEffect } from 'react';
import UserInfo from './UserInfo';
import RecentButton from './RecentButton';
import RiddleList from './RiddleList';
import './MainPage.css';

function MainPage() {
    const [user, setUser] = useState({ icon: '', nickname: 'Lumare', level: 4 });
    const [riddles, setRiddles] = useState([]);


    useEffect(() => {
        setRiddles([
            { id: 1, text: 'What has keys but can’t open locks?' },
            { id: 2, text: 'What has a ring but no finger?' },
        ]);
    }, []);

    return (
        <div className="main-page">
            <div className="main-center">
                <UserInfo user={user} />
                <RecentButton />
            </div>
            <div className="riddle-section">
                <RiddleList  riddles={riddles}/>
            </div>
        </div>
    );
}

export default MainPage;
