import React, {useState} from 'react';
import Sidebar from './component/Sidebar/Sidebar';
import './App.css';
import MainPage from "./component/MainPage/MainPage";
import ChatPage from "./component/ChatPage/ChatPage";

function App() {
    const [gameId, setGameId] = useState('main');
    const [isOpen, setIsOpen] = useState(true);
    const [user, setUser] = useState({ icon: '', nickname: 'Lumare', level: 4 });

    return (
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
    );
}

export default App;
