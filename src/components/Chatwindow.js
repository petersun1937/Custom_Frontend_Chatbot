import React, { useEffect, useRef, useState }  from 'react';
import ChatMessage from './Chatmessage';
import { motion, AnimatePresence } from 'framer-motion';


function ChatWindow({ messages }) {
  const [isDarkMode, setIsDarkMode] = useState(true);  // Manage dark mode state
  const chatWindowRef = useRef(null); // Ref to the chat window

  // Scroll to the bottom of the chat window whenever messages change
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]); // Trigger this effect whenever the messages array changes

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);  // Toggle dark mode on button click
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  return (
    <div className={`chat-app ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Button to toggle dark mode */}
      <button  className="dark-mode-toggle" onClick={toggleTheme}>
        {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
      {/* Chat window */}
      <div ref={chatWindowRef} className="chat-window">
      <AnimatePresence>
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }} // Initial animation properties
            animate={{ opacity: 1, y: 0 }}  // Animation to show the element
            exit={{ opacity: 0, y: 20 }}    // Animation when the element is removed
            transition={{ duration: 0.5 }}  // Control the speed of the animation
          >
            <ChatMessage message={msg.text} sender={msg.sender} />
          </motion.div>
        ))}
      </AnimatePresence>
      </div>
      </div>
  );
}

export default ChatWindow;

/*import React from 'react';
import ChatMessage from './ChatMessage.js';


function ChatWindow({ messages }) {
  return (
    <div className="chat-window">
      {messages.length === 0 ? (
        <p>No messages yet</p>
      ) : (
        messages.map((msg, index) => (
          <ChatMessage
            key={index}
            message={msg.text}  // Pass the message text
            sender={msg.sender} // Pass the sender ('user' or 'bot')
          />
        ))
      )}
    </div>
  );
}

export default ChatWindow;*/