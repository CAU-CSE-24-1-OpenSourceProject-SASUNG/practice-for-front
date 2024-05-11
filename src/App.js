import React, {useState} from 'react';
import Sidebar from './component/Sidebar/Sidebar';
import './App.css';
import MainPage from "./component/MainPage/MainPage";
import ChatPage from "./component/ChatPage/ChatPage";

function App() {
    const [content, setContent] = useState('main');

    return (
        <div className="app">
            <Sidebar setContent={ setContent } />
            {(content === 'main') ? <MainPage/> : <ChatPage content={content}/>}
        </div>
    );
}

export default App;
