import React, { useState } from 'react';
import ChatWindow from './Chatwindow';

function Chatbot() {
  const [messages, setMessages] = useState([]);

  const addMessage = (message) => {
    setMessages([...messages, message]);
  };

  return (
    <div className="chatbot">
      <ChatWindow messages={messages} />
      <InputForm addMessage={addMessage} />
    </div>
  );
}

export default Chatbot;
