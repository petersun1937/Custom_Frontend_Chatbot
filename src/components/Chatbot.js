import React, { useState } from 'react';
import ChatWindow from './Chatwindow';
import InputForm from './Inputform';
import { sendWebhook} from '../webhookService';

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false); // Initialize typing state

  const addMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
    //setMessages([...messages, message]);
  };

  const simulateTyping = async (delay = 500) => {
    setIsTyping(true); // Show typing indicator
    await new Promise((resolve) => setTimeout(resolve, delay)); // Simulate typing delay
    //await new Promise((resolve) => setTimeout(resolve, delay)); // Simulate delay
    //setIsTyping(false); // Hide typing indicator
  };

  /*const handleBotResponse = async (response) => {
    await simulateTyping(); // Keep typing indicator active until this completes
    addMessage({ sender: 'bot', text: response }); // Add bot message
    setIsTyping(false); // Hide typing indicator only after message is added
  };*/

  const handleBotResponse = async (sessionID, inputText) => {
    try {
      const response = await sendWebhook(sessionID, inputText);
      addMessage({ sender: 'bot', text: response.response });
    } catch (error) {
      console.error('Error:', error);
      addMessage({ sender: 'bot', text: 'There was an error processing your request.' });
    } finally {
      setIsTyping(false); // Stop typing animation when message is added
    }
  };

  return (
    <div className="chatbot">
      <ChatWindow messages={messages} isTyping={isTyping}  />
      <InputForm addMessage={addMessage} simulateTyping={simulateTyping} handleBotResponse={handleBotResponse}/>
    </div>
  );
}

export default Chatbot;
