import React, { useRef, useEffect } from 'react';
import './ChatWindow.css';

const ChatWindow = ({ queries = [] , query }) => {
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [queries]);

    return (
        <div className="chat-window">
            {queries.map((item) => (
                <div className="message-group" key={item.queryId}>
                    <div className="message user-message">{item.query}</div>
                    {item.response !== "" && (
                        <div className="message gpt-message">{item.response}</div>
                    )}
                </div>
            ))}
            <div ref={chatEndRef} /> {/* 이 div는 스크롤 위치를 조정하는 데 사용됩니다. */}
        </div>
    );
};

export default ChatWindow;
