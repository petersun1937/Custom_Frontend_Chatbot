import React from 'react';

function OutputLog({ outputLog }) {
  if (!outputLog) {
    return (
      <div className="output-log">
        <h3>Output Log</h3>
        <p>No output available yet.</p>
      </div>
    );
  }

  return (
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
  );
}

export default OutputLog;
