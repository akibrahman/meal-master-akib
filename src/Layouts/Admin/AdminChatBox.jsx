import { useRef, useState } from "react";

const AdminChatBox = ({ activeConversation }) => {
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

  // useEffect(() => {
  //   scroll.current.scrollTop = scroll.current.scrollHeight;
  // }, [messages]);

  const handleSendMessage = (message) => {
    setMessages([...messages, message]);
  };

  return (
    <>
      {activeConversation ? (
        <div
          ref={scroll}
          className="overflow-y-scroll rounded h-full bg-white relative"
        >
          <div className="bg-black sticky top-0 flex items-center gap-5 rounded-sm py-2 px-5 text-white">
            {/* <div className=""> */}
            <img
              className="w-10 h-10 rounded-full"
              src={activeConversation?.photo}
              alt=""
            />
            <div className="">
              <p className="text-lg">{activeConversation?.name}</p>
              <p className="text-xs">{activeConversation?.email}</p>
            </div>
            {/* </div> */}
          </div>
          {/* Messages */}
          <div className="mb-4 p-4 flex flex-col">
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
          <div className="flex sticky w-full bottom-0 left-0 bg-black rounded-sm p-2">
            <input
              type="text"
              className="flex-1 border p-2 rounded-sm"
              placeholder="Type your message..."
            />
            <button
              className="bg-[#FFBE00] text-white p-2 ml-2 rounded-sm"
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
      ) : (
        <div className="w-full h-full flex items-center justify-center border border-black">
          <p className="text-xl font-medium select-none">
            Click one conversation to start chat
          </p>
        </div>
      )}
    </>
  );
};

export default AdminChatBox;
