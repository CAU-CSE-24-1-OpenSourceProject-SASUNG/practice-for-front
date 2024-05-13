import React, {useState} from 'react';
import Sidebar from './component/Sidebar/Sidebar';
import './App.css';
import MainPage from "./component/MainPage/MainPage";
import ChatPage from "./component/ChatPage/ChatPage";

function App() {
    const [content, setContent] = useState('main');
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="app">
            <Sidebar setContent={ setContent } isOpen={isOpen} setIsOpen={ setIsOpen } />
            <div className={`main-content ${isOpen ? "" : "full"}`}>
                {(content === 'main') ?
                    <MainPage/> :
                    <ChatPage content={content}/>
                }
            </div>
        </div>
    );
}

export default App;
