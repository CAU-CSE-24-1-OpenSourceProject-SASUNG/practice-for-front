import React, {useEffect, useState} from 'react';
import './ChatPage.css';
import Logo from '../../static/icon/logo.svg';

function ChatPage({ gameId }) {
    const [gameInfo, setGameInfo] = useState({});

    useEffect(() => {
        const fetchGameInfo = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/gameinfo', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ gameId: gameId })
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                const gameInfo = await response.json();
                setGameInfo(gameInfo);
            } catch (error) {
                console.error('Failed to fetch gameInfo:', error);
            }
        };
        fetchGameInfo();
    }, [gameId]);

    return (
        <div className="chat-container">
            <div className="quiz-question">
                {`riddle Id : ${gameInfo.riddleId} | game Id : ${gameId} | problem : ${gameInfo.problem}`}
            </div>
            <div className="chat-group">
                <div id="chatWindow"></div>
                <div className="input-group">
                    <textarea id="userQuestion" className="chat-input" placeholder="Enter your question here..." rows="4"></textarea>
                    <button className="submit-button" type="submit">
                        <img className="logo" src={Logo} alt="Logo" />  { }
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ChatPage;
