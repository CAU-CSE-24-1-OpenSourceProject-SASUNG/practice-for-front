import React from 'react';
import './ChatPage.css'; // CSS 파일 임포트

function ChatPage({ content }) {
    const sendQuestion = (event) => {
        event.preventDefault();
        const question = document.getElementById('userQuestion').value;
        console.log(question); // 로깅을 위한 예시, 실제로는 서버에 요청을 보낼 수 있습니다.
    };

    return (
        <div className="chat-container">
            <h1>LPT_GPT</h1>
            <div className="quiz-question">
                {'problems ~~~~~~~~~ ~~~~~~~~~~~ '}
            </div>
            <div id="chatWindow"></div>
            <form className="input-group" onSubmit={sendQuestion}>
                <textarea id="userQuestion" className="chat-input" placeholder="Enter your question here..." rows="4"></textarea>
                <button className="submit-button" type="submit">Submit</button>
            </form>
        </div>
    );
}

export default ChatPage;
