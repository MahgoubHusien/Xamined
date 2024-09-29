import React, { useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';

const Chatbot = () => {
  const [messages, setMessages] = useState([{ text: "Welcome! Ask me anything about the tweet analysis.", sender: "bot" }]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput('');
      setTimeout(() => {
        setMessages(prev => [...prev, { text: "This is a filler response.", sender: "bot" }]);
      }, 500);
    }
  };

  return (
    <div className="bg-gray-100 shadow-lg rounded-lg p-6 w-full max-w-md text-charcoal flex flex-col h-[600px]">
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block p-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button onClick={handleSend} className="ml-2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
          <AiOutlineSend className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
