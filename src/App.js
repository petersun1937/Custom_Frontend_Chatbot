
import React, { useState } from 'react';
import './App.css';
import DocumentUpload from './components/DocumentUpload';
import ChatWindow from './components/Chatwindow';
import InputForm from './components/Inputform';
import Chatbot from './components/Chatbot';

function App() {
  const [messages, setMessages] = useState([]);

  const addMessage = (message) => {
    console.log('Current messages:', messages); // Debugging: shows existing messages
    console.log('New message to add:', message); // Debugging: shows new message
    //setMessages([...messages, message]); // Append the new message
    setMessages((prevMessages) => [...prevMessages, message]); // Use a function inside setMessages to access the current state (the previous messages array)
  };

  return (
    <div className="app-container">
      <div className="chat-and-upload">
      {/* Chat components */}
      <div className="chat-section">
        <h1>Support Chatbot</h1>
        {/* <ChatWindow messages={messages} />
        <InputForm addMessage={addMessage} /> */}
        <Chatbot messages={messages} addMessage={addMessage} />
      </div>
    {/* Document upload section */}
    <DocumentUpload /> 
      </div>
    </div>
  );
}

export default App;


/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;*/
