import React, { useRef, useEffect } from 'react';
import './ChatWindow.css';

const ChatWindow = ({ queries }) => {
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [queries]);

    return (
        <div className="chat-window">
            {queries.map((item, index) => (
                <div className="message-group" key={index}>
                    <div className="message user-message">{item.query}</div>
                    {item.response !== "" ? (
                        <div className="message gpt-message">{item.response}</div>
                    ) : (
                        <div className="message gpt-message">
                            {"질문을 판단하고 있습니다...  "}
                            <div className="loading-spinner"></div>
                        </div>
                    )}
                </div>
            ))}
            <div ref={chatEndRef} /> {/* 스크롤 위치를 조정하는 데 쓰임 */}
        </div>
    );
};

export default ChatWindow;
