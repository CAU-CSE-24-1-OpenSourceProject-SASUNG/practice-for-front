import React, { useEffect } from 'react';
import UserInfo from './UserInfo';
import RecentButton from './RecentButton';
import RiddleList from './RiddleList';
import './MainPage.css';
import axios from "axios";

function MainPage({ JWT, userInfo, setUserInfo, setGameId, riddles, setRiddles }) {


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/user/info`, {
            headers: {
                'Authorization': `Bearer ${JWT}`
            }
        }).then((response) => {
            setUserInfo({...userInfo, riddleTicket: response.data.riddleTicket, gameTicket: response.data.gameTicket});
        }).catch((error) => {
            console.error("Fail to fetch userinfo : ", error);
        });
    }, [JWT]);

    useEffect(() => {
        const fetchRiddleItems = async () => {
            axios.get(`${process.env.REACT_APP_API_URL}/riddle/list`, {
                headers: {
                    'Authorization': `Bearer ${JWT}`
                }
            }).then((response) => {
                setRiddles(response.data);
            }).catch ((error) => {
                console.error('Failed to fetch recent items:', error);
            })
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
