import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineSend } from 'react-icons/ai';

const Chatbot = () => {
  const [messages, setMessages] = useState([{ text: "Welcome! Ask me anything about the tweet analysis.", sender: "bot" }]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput('');
      setTimeout(() => {
        setMessages(prev => [...prev, { text: "This is a filler response.", sender: "bot" }]);
      }, 500);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="bg-gray-100 shadow-lg rounded-lg p-4 w-full max-w-md text-charcoal flex flex-col h-[470px]"> 
      <div className="flex-1 overflow-y-auto mb-4 pr-2">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-1 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}> 
            <div className={`relative inline-block p-3 rounded-lg text-sm font-medium ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-900'}`}>
              {msg.text}
              <span className={`absolute top-1/2 transform -translate-y-1/2 ${msg.sender === 'user' ? 'right-full -mr-2 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[8px] border-r-blue-500' : 'left-full -ml-2 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[8px] border-l-gray-300'}`} />
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className="flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
        <button onClick={handleSend} className="ml-2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
          <AiOutlineSend className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
