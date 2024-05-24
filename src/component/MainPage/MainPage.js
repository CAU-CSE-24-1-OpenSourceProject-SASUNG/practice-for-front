import React, { useEffect } from 'react';
import UserInfo from './UserInfo';
import RecentButton from './RecentButton';
import RiddleList from './RiddleList';
import './MainPage.css';
import axios from "axios";

function MainPage({ JWT, userInfo, setUserInfo, setGameId, riddles, setRiddles }) {

    // TODO: 메인 페이지가 로드될 떄 userinfo가 fetch되도록.
    useEffect(() => {
        axios.get('http://localhost:8000/user/info', {
            headers: {
                'Authorization': `Bearer ${JWT}`
            }
        }).then((response) => {
            setUserInfo(response.data);
        }).catch((error) => {
            console.error("Fail to fetch userinfo : ", error);
        });
    }, [JWT, setUserInfo]);

    useEffect(() => {
        const fetchRiddleItems = async () => {
            try {
                const response = await fetch('http://localhost:8000/riddle/list', {
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
    }, [JWT, setRiddles]);


    return (
        <div className="main-page">
            <div className="main-center">
                <UserInfo userInfo={userInfo} />
                <RecentButton setGameId={setGameId} />
            </div>
            <div className="riddle-section">
                <RiddleList JWT={JWT} userInfo={userInfo} setGameId={setGameId} riddles={riddles} />
            </div>
        </div>
    );
}

export default MainPage;
