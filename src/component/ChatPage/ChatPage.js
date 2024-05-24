import React, { useEffect, useState } from 'react';
import './ChatPage.css';
import Logo from '../../static/icon/logo.svg';
import ChatWindow from "./ChatWindow";
import axios from "axios";
import ReactMarkdown from 'react-markdown';

function ChatPage({ JWT, gameId }) {
    const [gameInfo, setGameInfo] = useState(
        [
            { gameTitle: 'dummy', problem: 'dummy problem' }
        ]
    );
    const [query, setQuery] = useState("");
    const [queries, setQueries] = useState([]);
    const [canSubmit, setCanSubmit] = useState(true);

    useEffect(() => {
        const fetchGameInfo = async () => {
            axios.get(`${process.env.REACT_APP_API_URL}/game/info`, {
                params: { gameId: gameId },
                headers: {
                    'Authorization': `Bearer ${JWT}`
                }
            }).then((response) => {
                const gameInfo = response.data;
                const [gameDetails, ...queries] = gameInfo;
                setGameInfo(gameDetails);
                setQueries(queries);
            }).catch((error) => {
                console.error('Failed to fetch gameInfo:', error);
            });
        };
        fetchGameInfo();
    }, [JWT, gameId]);

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const fetchGptResponse = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/chat`,
                { game_id: gameId, query: query }, {
                    headers: {
                        'Authorization': `Bearer ${JWT}`,
                        'Content-Type': 'application/json'
                    }
                });
            return response.data;
        } catch (error) {
            console.error('Failed to fetch recent items:', error);
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setQuery("");
        const inputLength = query.length;
        if (!canSubmit || inputLength < 1 || inputLength > 200)
            return;
        setCanSubmit(false);
        const newQueryText = query;
        console.log(newQueryText);
        const dummyQuery = { queryId: "dummyId", query: newQueryText, response: "" };
        setQueries([...queries, dummyQuery]);
        const response = await fetchGptResponse();
        if (response) {
            const updatedQuery = { query: newQueryText, queryId: response.queryId, response: response.response };
            setQueries([...queries, updatedQuery]);
        }
        else
            alert("해당 게임의 모든 기회를 소진하셨습니다.");
        setCanSubmit(true);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSubmit(event);
        }
    };

    return (
        <div className="chat-container">
            <div className="quiz-problem">
                <ReactMarkdown>{gameInfo.problem}</ReactMarkdown>
            </div>
            <div className="chat-group">
                <ChatWindow queries={queries} query={query} />
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
