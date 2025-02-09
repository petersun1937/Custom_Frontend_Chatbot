
import React, { useState } from 'react';
import './App.css';
import DocumentUpload from './components/DocumentUpload';
import ChatWindow from './components/Chatwindow';
import InputForm from './components/Inputform';
import Chatbot from './components/Chatbot';
import OutputLog from './components/OutputLogs';

function App() {
  const [messages, setMessages] = useState([]);
  const [outputLog, setOutputLog] = useState(null); // State for output log
  const [aiConfig, setAIConfig] = useState(null);

  const addMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  return (
    <div className="app-container">
      <div className="chat-and-upload">
        <div className="chat-section">
          <h1>Support Chatbot</h1>
          <Chatbot messages={messages} addMessage={addMessage} setOutputLog={setOutputLog} setAIConfig={setAIConfig} />
        </div>
        <DocumentUpload />
      </div>


      {/* Output Log should show AI config */}
      <div className="output-log-section">
        <OutputLog outputLog={outputLog} aiConfig={aiConfig} setAIConfig={setAIConfig} />
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
