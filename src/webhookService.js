import config from './config';
// webhookService.js

/*export async function sendWebhook(event, message) {
    try {
      const response = await fetch('https://cool-game-meerkat.ngrok-free.app/api/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event: event,
          message: message,
        }),
      });
  
      const data = await response.json();
      console.log('Webhook response:', data);
    } catch (error) {
      console.error('Error sending webhook:', error);
    }
  }*/

export async function sendWebhook(sessionID, message) { 
  // Generate sessionID if not already generated
  //const sessionID = localStorage.getItem('sessionID') || generateUUID();

  // Check if a sessionID exists, if not, generate and store a new one
  if (!localStorage.getItem('sessionID')) {
    const newSessionID = generateUUID(); // Assuming you have a UUID generator function
    localStorage.setItem('sessionID', newSessionID);
  }

  try {
      const response = await fetch(`${config.baseURL}/message`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              sessionID: localStorage.getItem('sessionID'), // Add session ID
              message: message,
          }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
          //console.error('Error:', response.statusText);
          //return;
      }

      const data = await response.json();
      console.log('Webhook response:', data); // Log the response
      return data; // Return the response to be used in the frontend component

  } catch (error) {
      console.error('Error sending webhook:', error);
      throw error; 
  }
}
  
// Function to generate a simple UUID for session ID (use library?)
export function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}


// Function to generate a simple UUID for session ID (use library?)
/*function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}*/