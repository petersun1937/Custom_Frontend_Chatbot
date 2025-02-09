import React, { useEffect, useState } from "react";
import config from "../config"; // Import baseURL

function OutputLog({ outputLog, aiConfig, setAIConfig }) {
  //const [aiConfig, setAIConfig] = useState(null);

  // Construct the URL dynamically
  const url = `${config.baseURL}/ai-config`;

  useEffect(() => {
    console.log("Fetching AI Config from:", url); // Debugging

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420", // If using ngrok
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Setting AI Config Data:", data); // Debugging state update
        setAIConfig(data);
      })
      .catch((error) => console.error("Error fetching AI config:", error));
  }, [setAIConfig]);

  if (!outputLog) {
    return (
      <div className="output-log">
        <h3>Output Log</h3>
        <p>No output available yet.</p>
      </div>
    );
  }

  return (
    <div className="output-log-container">
      <div className="output-log">
        <h3>Output Log</h3>
        <p>
          <strong>Detected Intent:</strong> {outputLog.intent || "No intent detected"}
        </p>
        <h4>Top Selected Chunks:</h4>
        {outputLog.chunks && outputLog.chunks.length > 0 ? (
          <ul>
            {outputLog.chunks.map((chunk, index) => (
              <li key={index}>
                Chunk ID: {chunk.id || "N/A"}, Similarity Score: {chunk.score?.toFixed(2) || "N/A"}
              </li>
            ))}
          </ul>
        ) : (
          <p>No chunks selected.</p>
        )}
      </div>

      {/* AI Provider Info Boxes */}
      {aiConfig !== null && (
        <div className="ai-status-container">
          <div className="ai-provider-box">
            <h4>Current Language Model</h4>
            <p>
              {aiConfig.UseOpenAI
                ? "OpenAI GPT-4"
                : aiConfig.UseMistral
                ? "Mistral-large"
                : aiConfig.UseMETA
                ? "META Llama-3.3"
                : "None"}
            </p>
          </div>
          <div className="dialogflow-status-box">
            <h4>Dialogflow Intent Matching</h4>
            <p>{aiConfig.UseDialogflow ? "Enabled" : "Disabled"}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default OutputLog;
