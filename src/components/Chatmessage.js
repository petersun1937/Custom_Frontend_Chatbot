import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

function ChatMessage({ message, sender }) {
  const isUserMessage = sender === 'user';

  return (
    <div className={`chat-message ${isUserMessage ? 'user-message' : 'bot-message'}`}>
      <ReactMarkdown
        children={message.replace(/\n/g, '  \n')} 
        remarkPlugins={[remarkGfm]} // Enables GitHub Flavored Markdown
        rehypePlugins={[rehypeRaw]} // Allows rendering raw HTML inside Markdown
      />
    </div>
  );
}

export default ChatMessage;
