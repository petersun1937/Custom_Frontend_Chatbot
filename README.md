
# Chatbot App Frontend

This repository contains the custom frontend for a multi-platform chatbot that provides user-friendly interaction and additional features to enhance the user experience.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Build for Production](#build-for-production)
- [Deployment](#deployment)
- [Usage](#usage)
- [License](#license)
- [Contact](#contact)

## Features
- **Chat UI**: A user-friendly interface to interact with the chatbot, allowing users to send messages and receive responses from the backend server.
- **Document Upload**: Provides users with the ability to upload documents to enhance chatbot response relevance.
- **Output Log**: The output log displays the detected intent and top-selected chunks with similarity scores for transparency and debugging purposes.
- **Dark Mode/Light Mode**: Includes a toggle feature for switching between dark and light themes to suit user preferences.

## Installation

### Clone the Repository
```bash
git clone https://github.com/petersun1937/Custom_Frontend_Chatbot.git
cd Custom_Frontend_Chatbot
```

### Install Dependencies
1. **Ensure Node.js is installed**:
   - Download and install [Node.js](https://nodejs.org/).
2. **Install project dependencies**:
   ```bash
   npm install
   ```

### Start the Development Server
- Run the application locally:
  ```bash
  npm start
  ```
- Access the app at [http://localhost:3000](http://localhost:3000) by default.

## Build for Production

To create a production-ready build of the application:
```bash
npm run build
```
- The build files will be located in the `build/` directory.


## Deployment

The production-ready build can be deployed to any static hosting provider. This repo is deployed on **GitHub Pages**. [Check here](https://petersun1937.github.io/Custom_Frontend_Chatbot/).

Ensure the `build/` folder is served by your chosen hosting provider.

## Usage

1. **Upload Documents**: 
   - Upload documents (PDF, DOC, or TXT) to provide additional context for chatbot interactions.
2. **View Uploaded Documents**: 
   - Check the uploaded document list in the app.
3. **Interact with the Chatbot**:
   - Start a conversation with the chatbot using the provided UI.
   - Use the command `/openai` to disable Dialogflow intent matching and allow broader chunk searches.
   - Use `/dialogflow` to re-enable intent matching.
4. **Review Output Log**:
   - Review the detected intent and top-selected chunks with similarity scores in the output log section.

## License

This project is licensed under the MIT License.

## Contact

If you have any questions or suggestions, feel free to reach out to cxs1937@psu.edu.