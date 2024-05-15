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
    const [JWT, setJWT] = useState();
    const [userInfo, setUserInfo] = useState(
        {name : "", email : "", picture: "", exp: 1});

    return (
        <div className="app">
            {(isLogin === false) ?
                <GoogleLoginPage
                    setIsLogin={ setIsLogin }
                    setUserInfo={ setUserInfo }
                    setJWT={setJWT}
                /> :
                <div className="app">
                    <Sidebar
                        JWT={JWT}
                        userInfo={userInfo}
                        gameId={ gameId }
                        setGameId={ setGameId }
                        isOpen={isOpen}
                        setIsOpen={ setIsOpen }
                    />
                    <div className={`main-content ${isOpen ? "" : "full"}`}>
                        {(gameId === 'main') ?
                            <MainPage
                                JWT={JWT}
                                userInfo={userInfo}
                                setGameId={setGameId}/> :
                            <ChatPage
                                JWT={JWT}
                                gameId={gameId}/>
                        }
                    </div>
                </div>

            }
        </div>
    );
}

export default App;
