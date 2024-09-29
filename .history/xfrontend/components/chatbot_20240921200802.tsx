import React, { useState } from "react";

const ChatBot = ({ tweetId }: { tweetId: string }) => {
  const [messages, setMessages] = useState([{ text: "Welcome! Ask me anything about the tweet analysis.", sender: "bot" }]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");
      // Mock response
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: input, sender: "user" },
          { text: "Analyzing the tweet... Please wait.", sender: "bot" }
        ]);
      }, 500);
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-lg w-full max-h-96 overflow-y-auto flex flex-col">
      <div className="flex-1 mb-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
            <div className={`inline-block p-2 rounded-lg ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-black dark:bg-gray-600 dark:text-white"}`}>
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
          className="p-2 flex-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          placeholder="Type your message..."
        />
        <button onClick={handleSend} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
