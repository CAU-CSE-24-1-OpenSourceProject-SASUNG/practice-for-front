import React from 'react';
import './ChatPage.css';
import Logo from '../../static/icon/logo.svg';

function ChatPage({ content }) {
//    const sendQuestion = (event) => {
//        event.preventDefault();
//        const question = document.getElementById('userQuestion').value;
//        console.log(question); // 로깅을 위한 예시, 실제로는 서버에 요청을 보낼 수 있습니다.
//    };

    return (
        <div className="chat-container">
            <div className="quiz-question">
                {'problems ~~~~~~~~~ ~~~~~~~~~~~ '}
            </div>
            <div className="chat-group">
                <div id="chatWindow"></div>
                <div className="input-group">
                    <textarea id="userQuestion" className="chat-input" placeholder="Enter your question here..." rows="4"></textarea>
                    <button className="submit-button" type="submit">
                        <img class="logo" src={Logo} alt="Logo" />  { }
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ChatPage;
