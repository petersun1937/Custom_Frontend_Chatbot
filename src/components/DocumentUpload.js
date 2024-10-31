import React, { useState, useEffect} from 'react';
import { generateUUID } from '../webhookService';
import config from '../config';

function DocumentUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [documents, setDocuments] = useState([]); // Store the uploaded documents
  const [fetchError, setFetchError] = useState(''); // Error for document fetching
  const [uploadError, setUploadError] = useState(''); // Error for uploading files
  const [uploadSuccess, setUploadSuccess] = useState(''); // Success message
  //const fileInputRef = useRef(); // Reference to the file input

  const url = `${config.baseURL}/document/list`;

 // Generate sessionID if it doesn't exist
 const getSessionID = () => {
    let sessionID = localStorage.getItem('sessionID');
    if (!sessionID) {
      sessionID = generateUUID();
      localStorage.setItem('sessionID', sessionID);
    }
    return sessionID;
  };

  // Fetch documents from the backend on component mount
  useEffect(() => {
    fetchDocuments();
  }, []);

  // Function to fetch uploaded documents
  const fetchDocuments = async () => {
    //const sessionID = getSessionID(); // Ensure sessionID is sent

    console.log('Fetching documents from:', url); // Log the URL

    try {
       const response = await fetch(url, { // GET still needs to be specified
        method: 'GET',
        mode: "cors",  // Ensure CORS mode
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
        },
      });

      console.log('Response status:', response.status); // Log status code
      

      if (response.ok) {
        const data = await response.json();
        console.log('Documents fetched successfully:', data); // Log fetched data
        setDocuments(data.filenames); // Set state with filenames
        setFetchError('');
      } else {
        throw new Error(`Failed to fetch documents: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error fetching documents:', error); // Log any errors
      setFetchError('Failed to load documents.');
    }

    /*} catch (error) {
        console.error('Error fetching documents:', error); // Log any errors
        setFetchError('Failed to load documents.'); // Set fetch error message
    }*/
  };

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setUploadError(''); // Clear any previous upload error
    }
  };

  // Handle document upload
  const handleUpload = async () => {
    if (!selectedFile) {
        setUploadError('Please select a file before uploading.'); // Set error if no file selected
      return;
    }

    const formData = new FormData();
    formData.append('document', selectedFile);
    formData.append('sessionID', getSessionID()); // Add sessionID to the request

    try {
      setUploading(true);
        const response = await fetch(`${config.baseURL}/api/document/upload`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        await fetchDocuments(); // Refresh the document list
        setSelectedFile(null); // Clear the selected file
        //fileInputRef.current.value = ''; // Reset the file input
        setUploadSuccess('Document uploaded and processed successfully!'); // Show success message
        setUploadError(''); // Clear error message
      } else {
        console.error('Error uploading document:', response.statusText);
        setUploadError('Upload failed. Please try again.'); // Set upload error
      }
    } catch (error) {
      console.error('Upload failed:', error);
      setUploadError('Upload failed. Please try again.'); // Set upload error
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="document-upload">
      <h3>Upload Documents Here for Context</h3>
      <input type="file" onChange={handleFileChange} accept=".txt,.pdf,.docx" />
      <button onClick={handleUpload} disabled={uploading}>
        <i className="fas fa-file-upload"></i>
        {uploading ? <span> Uploading<span className="dots"></span></span> : ' Upload'}
        </button>
      {/* Upload Success Message */}
      {uploadSuccess && <p style={{ color: 'green', marginTop: '10px' }}>{uploadSuccess}</p>}

      {/* Upload Error Message */}
      {uploadError && <p style={{ color: 'red', marginTop: '10px' }}>{uploadError}</p>}

      <h3>Document List</h3>
        {/* Fetch Error Message */}
        {fetchError && <p style={{ color: 'red', marginTop: '10px' }}>{fetchError}</p>} 

      {documents.length > 0 ? (
        <div className="document-list">
        <ul>
          {documents.map((filename, index) => (
            <li key={index}>{filename}</li>
          ))}
        </ul>
        </div>
      ) : (
        <p>No documents uploaded yet.</p>
      )}
    </div>
  );
}

export default DocumentUpload;
