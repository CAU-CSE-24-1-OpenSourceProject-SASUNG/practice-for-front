import React, {useEffect, useState} from 'react';
import './ChatPage.css';
import Logo from '../../static/icon/logo.svg';
import ChatWindow from "./ChatWindow";
import axios from "axios";

function ChatPage({JWT, gameId }) {
    const [gameInfo, setGameInfo] = useState(
        [
            {gameTitle : 'dummy', problem : 'dummy problem'}
        ]
    );
    const [newQuery, setNewQuery] = useState({queryId: "",query: "", response: ""});
    const [query, setQuery] = useState("");
    const [queries, setQueries] = useState([]);
    const [canSubmit, setCanSubmit] = useState(true);

    useEffect(() => {
        const fetchGameInfo = async () => {
            axios.get(`http://localhost:8000/gameinfo`, {
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

    //쿼리 set
    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const fetchGptResponse = () => {
        axios.post(`http://localhost:8000/chat`,
            {game_id: gameId, query: query}, {
            headers: {
                'Authorization': `Bearer ${JWT}`,
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            setNewQuery({queryId: response.data.queryId, query: newQuery.query, response: response.data.response});
        }).catch((error) => {
            console.error('Failed to fetch recent items:', error);
        });
    };

    //submit event
    const handleSubmit = async (e) => {
        e.preventDefault();
        const inputLength = query.length;
        if (!canSubmit || inputLength < 1 || inputLength > 200)
            return;
        setCanSubmit(false);
        setNewQuery({queryId: "dummyId", query: query, response: ""})
        setQuery("");  // 입력 필드 초기화
        setQueries([...queries, newQuery])
        await fetchGptResponse();
        setQueries([...queries.slice(0, -1), newQuery]);
        setCanSubmit(true);
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
                {`riddle Id : ${gameInfo.gameTitle} | game Id : ${gameId} | problem : ${gameInfo.problem}`}
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
