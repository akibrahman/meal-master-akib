import { useEffect, useRef, useState } from "react";

const ChatBox = () => {
  const scroll = useRef();

  const [messages, setMessages] = useState([
    { id: 1, text: "Hello!", sender: "Person 1" },
    { id: 1, text: "Hello!", sender: "Person 2" },
    { id: 1, text: "Hello!", sender: "Person 1" },
    { id: 1, text: "Hello!", sender: "Person 2" },
    { id: 1, text: "Hello!", sender: "Person 1" },
    { id: 1, text: "Hello!", sender: "Person 2" },
    { id: 1, text: "Hello!", sender: "Person 1" },
    { id: 1, text: "Hello!", sender: "Person 2" },
    { id: 1, text: "Hello!", sender: "Person 1" },
    { id: 1, text: "Hello!", sender: "Person 2" },
    { id: 1, text: "Hello!", sender: "Person 1" },
    { id: 1, text: "Hello!", sender: "Person 2" },
    { id: 1, text: "Hello!", sender: "Person 1" },
    {
      id: 2,
      text: "Hi there! It's been a long time, we haven't meet.",
      sender: "Person 2",
    },
    {
      id: 2,
      text: "Hi there! It's been a long time, we haven't meet.",
      sender: "Person 1",
    },
    {
      id: 2,
      text: "Hi there! It's been a long time, we haven't meet.",
      sender: "Person 2",
    },
    {
      id: 2,
      text: "Hi there! It's been a long time, we haven't meet.",
      sender: "Person 1",
    },
    {
      id: 2,
      text: "Hi there! It's been a long time, we haven't meet.",
      sender: "Person 2",
    },
    {
      id: 2,
      text: "Hi there! It's been a long time, we haven't meet.",
      sender: "Person 1",
    },
    {
      id: 2,
      text: "Hi there! It's been a long time, we haven't meet.",
      sender: "Person 2",
    },
  ]);

  useEffect(() => {
    scroll.current.scrollTop = scroll.current.scrollHeight;
  }, [messages]);

  const handleSendMessage = (message) => {
    setMessages([...messages, message]);
  };

  return (
    <div
      ref={scroll}
      className="overflow-y-scroll border rounded h-full bg-white relative p-4 pb-0"
    >
      {/* Messages */}
      <div className="mb-4 flex flex-col">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-2 bg-black text-white px-3 py-1 font-medium w-max max-w-xs text-center rounded-md ${
              message.sender === "Person 1" ? "self-start" : "self-end"
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>
      {/* Message input */}
      <div className="flex sticky w-full bottom-0 left-0 bg-white p-2 pt-">
        <input
          type="text"
          className="flex-1 border p-2 rounded"
          placeholder="Type your message..."
        />
        <button
          className="bg-[#FFBE00] text-white p-2 ml-2 rounded"
          onClick={() =>
            handleSendMessage({
              id: messages.length + 1,
              text: "New message",
              sender: "Person 1", // Change sender as needed
            })
          }
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
