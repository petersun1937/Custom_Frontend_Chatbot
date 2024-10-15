import React from 'react';

function ChatMessage({ message, sender }) {
  const isUserMessage = sender === 'user';

  return (
    <div className={`chat-message ${isUserMessage ? 'user-message' : 'bot-message'}`}>
      <p>{message}</p>
    </div>
  );
}

export default ChatMessage;