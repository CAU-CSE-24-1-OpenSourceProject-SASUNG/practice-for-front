import React, {useState} from 'react';
import Sidebar from './component/Sidebar/Sidebar';
import './App.css';
import MainPage from "./component/MainPage/MainPage";
import ChatPage from "./component/ChatPage/ChatPage";
import { GoogleLoginPage } from './component/Login/GoogleLoginPage';

function App() {
    const [gameId, setGameId] = useState('main');
    const [isOpen, setIsOpen] = useState(true);
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState({ icon: '', nickname: 'Lumare', level: 4 });

    //TODO: 로그인 boolean 체크 및 서버로 jwt 토큰 확인으로 변경할 것
    return (
        <div className="app">
            {(isLogin === false) ?
                <GoogleLoginPage setIsLogin={ setIsLogin } setUser={ setUser }/> :
                <div className="app">
                    <Sidebar
                        user={user}
                        gameId={ gameId }
                        setGameId={ setGameId }
                        isOpen={isOpen}
                        setIsOpen={ setIsOpen }
                    />
                    <div className={`main-content ${isOpen ? "" : "full"}`}>
                        {(gameId === 'main') ?
                            <MainPage user={user} setGameId={setGameId}/> :
                            <ChatPage user={user} gameId={gameId}/>
                        }
                    </div>
                </div>

            }
        </div>
    );
}

export default App;
