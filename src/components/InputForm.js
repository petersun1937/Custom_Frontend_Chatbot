import React, { useState } from 'react';
import { sendWebhook, generateUUID } from '../webhookService';

// Generate a session ID if it doesn't exist in localStorage
function getSessionID() {
  let sessionID = localStorage.getItem('sessionID');
  if (!sessionID) {
    sessionID = generateUUID();
    localStorage.setItem('sessionID', sessionID);
  }
  return sessionID;
}


function InputForm({ addMessage }) {
  const [inputText, setInputText] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false); // State for uploading
  const hiddenFileInput = React.useRef(null); // Reference to the hidden file input

  const handleSubmit = async (event) => {
    event.preventDefault();
    const sessionID = getSessionID();
  
    if (selectedFile) {
      const formData = new FormData();
      formData.append('document', selectedFile);
      formData.append('sessionID', sessionID);
  
      try {
        setUploading(true); // Set uploading state to true
        //const response = await fetch('https://cool-game-meerkat.ngrok-free.app/api/document/upload', {
          const response = await fetch('https://cross-platform-chatbot-app-5211eb66d32b.herokuapp.com/api/document/upload', {
          method: 'POST',
          body: formData,
        });
  
        const data = await response.json();
        
        // Display user message after the backend response is received
        addMessage({ sender: 'user', text: `Uploaded: ${selectedFile.name}` });
        addMessage({ sender: 'bot', text: data.response });
  
        setSelectedFile(null); // Clear the selected file after submission
        setInputText(''); // Clear the input text
        setUploading(false); // Reset uploading state after completion
  
      } catch (error) {
        console.error('Error uploading file:', error);
        addMessage({ sender: 'bot', text: 'Error uploading file.' });
        setUploading(false); // Reset uploading state in case of error
      }
    } else if (inputText.trim() !== '') {
      // Handle text message sending
      addMessage({ sender: 'user', text: inputText });
      setInputText(''); // Clear the input text
      try {
        const response = await sendWebhook(sessionID, inputText);
        addMessage({ sender: 'bot', text: response.response });
      } catch (error) {
        console.error('Error:', error);
        addMessage({ sender: 'bot', text: 'There was an error processing your request.' });
      }
  
      setSelectedFile(null); // Clear selected file
      //setInputText(''); // Clear input text for new uploads
    }
  };

  const handleFileClick = () => {
    hiddenFileInput.current.click(); // Programmatically trigger the hidden input click
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setInputText(`Selected file: ${file.name}`); // Display the file name in the input box
    }
    // Reset the file input to allow selecting the same file again if needed
    event.target.value = ''; 
  };

  const clearSelectedFile = () => {
    setSelectedFile(null); // Clear selected file
    setInputText(''); // Clear the input text
  };

  return (
    <form onSubmit={handleSubmit} className="input-form">
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Type a message or upload a document..."
        disabled={!!selectedFile || uploading} // Disable typing when a file is selected or uploading
      />
      <button type="button" className="upload-button" onClick={handleFileClick} title="Document Upload">
        <i className="fas fa-file-upload"></i>
      </button>
      <input
        type="file"
        ref={hiddenFileInput}
        style={{ display: 'none' }} // Hide the actual file input
        onChange={handleFileChange}
        accept=".txt,.pdf,.docx"
      />
      {selectedFile && !uploading && (
        <button type="button" className="clear-button" onClick={clearSelectedFile}>
          Clear
        </button>
      )}
      <button type="submit">
        {uploading ? (
          <span>Uploading<span className="dots"></span></span> // Show "Uploading..." inside the button
        ) : (
          "Send"
        )}
      </button>
    </form>
  );
}


export default InputForm;


