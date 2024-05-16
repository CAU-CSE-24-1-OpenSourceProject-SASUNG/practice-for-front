import React, {useEffect, useState} from 'react';
import './ChatPage.css';
import Logo from '../../static/icon/logo.svg';
import ChatWindow from "./ChatWindow";

function ChatPage({JWT, gameId }) {
    const [gameInfo, setGameInfo] = useState(
        [
            {gameTitle : 'dummy', problem : 'dummy problem'}
        ]
    );
    const [query, setQuery] = useState("");
    const [queries, setQueries] = useState([]);
    const [canSubmit, setCanSubmit] = useState(true);

    useEffect(() => {
        const fetchGameInfo = async () => {
            try {
                const response = await fetch('https://newturtles.newpotatoes.org/api/gameinfo', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${JWT}`
                    },
                    body: JSON.stringify({ gameId: gameId })
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                const gameInfo = await response.json();
                setGameInfo(gameInfo);
                setQueries(gameInfo.slice(1));
            } catch (error) {
                console.error('Failed to fetch gameInfo:', error);
            }
        };
        fetchGameInfo();
    }, [JWT, gameId]);

    //쿼리 set
    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const fetchGptResponse = async () => {
//        try {
//            const response = await fetch('http://localhost:8000/chat', {
//                method : "POST",
//                headers: {
//                    'Authorization': `Bearer ${JWT}`,
//                    'Content-Type': 'application/json'
//                },
//                body: JSON.stringify({gameId: gameId, query: query})
//            });
//            const chatResponse = await response.json();
//            console.log(chatResponse);
//            return chatResponse;
//        } catch (error) {
//            console.error('Failed to fetch recent items:', error);
//        }
        return "response test";
    };

    //submit event
    const handleSubmit = async (e) => {
        const inputLength = query.length;
        if (!canSubmit || inputLength < 1 || inputLength > 200)
            return;
        setCanSubmit(false);
        e.preventDefault();
        const newQuery = {queryId:query , query: query, response: ""};
        setQueries([...queries, newQuery]);  // 새 쿼리를 추가
        newQuery.response = await fetchGptResponse();
        setCanSubmit(true);
        setQuery("");  // 입력 필드 초기화
    };

    //enter submit
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSubmit(event);
        }
    };


    return (
        <div className="chat-container">
            <div className="quiz-problem">
                {`riddle Id : ${gameInfo[0].gameTitle} | game Id : ${gameId} | problem : ${gameInfo[0].problem}`}
            </div>
            <div className="chat-group">
                <ChatWindow queries={queries} query={query}/>
                <div className="input-group">
                    <textarea
                        id="userQuestion"
                        className="chat-input"
                        placeholder="Enter your question here..."
                        rows="4"
                        value={query}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                    />
                    <button
                        className="submit-button"
                        type="submit"
                        onClick={handleSubmit}
                        disabled={!canSubmit || query.length < 1 || query.length > 200}
                    >
                        <img className="logo" src={Logo} alt="Logo" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ChatPage;
