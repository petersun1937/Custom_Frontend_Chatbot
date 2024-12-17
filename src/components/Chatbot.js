import React, { useState } from 'react';
import ChatWindow from './Chatwindow';
import InputForm from './Inputform';
import { sendWebhook} from '../webhookService';
import OutputLog from './OutputLogs';

// function Chatbot({ messages, addMessage, setOutputLog }) {
//   const [isTyping, setIsTyping] = useState(false);

//   const handleBotResponse = async (sessionID, inputText) => {
//     try {
//       setIsTyping(true); // Show typing animation
      
//       // Make API call to your backend
//       const response = await sendWebhook(sessionID, inputText);

//       // Add bot response to the chat
//       addMessage({ sender: 'bot', text: response.response });

//       // Update Output Log
//       setOutputLog({
//         intent: response.intent || "No intent detected",
//         chunks: response.chunks?.length
//           ? response.chunks.map((chunk) => ({
//               id: chunk.id,
//               score: chunk.score,
//             }))
//           : [],
//       });
//     } catch (error) {
//       console.error('Error:', error);
//       addMessage({ sender: 'bot', text: 'There was an error processing your request.' });

//       // Handle errors gracefully for Output Log
//       setOutputLog({ intent: "No intent detected", chunks: [] });
//     } finally {
//       setIsTyping(false);
//     }
//   };

//   return (
//     <div className="chatbot">
//       <ChatWindow messages={messages} isTyping={isTyping} />
//       <InputForm addMessage={addMessage} handleBotResponse={handleBotResponse} />
//     </div>
//   );
// }


// export default Chatbot;


function Chatbot({ messages, addMessage, setOutputLog }) {
  //const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false); // Initialize typing state

  /*const addMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
    //setMessages([...messages, message]);
  };*/

  const simulateTyping = async (delay = 500) => {
    setIsTyping(true); // Show typing indicator
    await new Promise((resolve) => setTimeout(resolve, delay)); // Simulate typing delay
    //await new Promise((resolve) => setTimeout(resolve, delay)); // Simulate delay
    //setIsTyping(false); // Hide typing indicator
  };

  const handleBotResponse = async (sessionID, inputText) => {
    try {
      // Simulate or call webhook to fetch response
      const response = await sendWebhook(sessionID, inputText);
  
      // Add bot response to the chat
      addMessage({ sender: 'bot', text: response.response });
  
      // Update Output Log with response data
      setOutputLog({
        intent: response.intent || "No intent detected",
        chunks: response.chunks ? response.chunks : [],
      });
    } catch (error) {
      console.error('Error:', error);
      addMessage({ sender: 'bot', text: 'Error processing your request.' });
  
      // Update Output Log in case of failure
      setOutputLog({
        intent: "No intent detected",
        chunks: [],
      });
    }finally {
      // Ensure the typing animation stops
      setIsTyping(false);
    }
  };
  

  // const handleBotResponse = async (sessionID, inputText) => {
  //   try {
  //     const response = await sendWebhook(sessionID, inputText);
  //     addMessage({ sender: 'bot', text: response.response });
  //   } catch (error) {
  //     console.error('Error:', error);
  //     addMessage({ sender: 'bot', text: 'There was an error processing your request.' });
  //   } finally {
  //     setIsTyping(false); // Stop typing animation when message is added
  //   }
  // };

  return (
    <div className="chatbot">
      <ChatWindow messages={messages} isTyping={isTyping}  />
      <InputForm addMessage={addMessage} simulateTyping={simulateTyping} handleBotResponse={handleBotResponse}/>
    </div>
  );
}

export default Chatbot;
