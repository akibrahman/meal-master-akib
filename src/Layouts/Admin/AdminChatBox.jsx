import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Loader from "../../Components/Shared/Loader";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const AdminChatBox = ({ activeConversation }) => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const scroll = useRef();
  const text = useRef();
  const axiosInstance = useAxiosSecure();
  const socket = useRef();

  //! Socket Setup
  useEffect(() => {
    socket.current = io(import.meta.env.VITE_socketUrl);
    socket.current.emit("new-user-add", "admin");
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, []);

  const { data: messages, refetch: messagesRefetch } = useQuery({
    queryKey: [activeConversation?._id, "messages"],
    queryFn: async ({ queryKey }) => {
      const data = await axiosInstance.get(`/messages/${queryKey[0]}`);
      return data.data;
    },
  });

  //!Receiving msg by Socket
  useEffect(() => {
    socket.current.on("to-admin", async () => {
      await messagesRefetch();
      // alert();
    });
  });

  useEffect(() => {
    if (scroll.current) {
      scroll.current.scrollTop = scroll.current.scrollHeight;
    }
  });

  const sendMessage = async () => {
    const data = {
      conversationId: activeConversation._id,
      sender: "admin",
      receiver: activeConversation.userId,
      text: text.current.value,
    };
    await axiosInstance.post("/send-message", data);
    await messagesRefetch();
    //! Sending msg by Socket to User
    socket.current.emit("to-user", data);
    text.current.value = "";
  };

  if (!messages) return <Loader />;
  return (
    <>
      {activeConversation ? (
        <div
          ref={scroll}
          className="overflow-y-scroll rounded h-full bg-white relative"
        >
          <div className="bg-black sticky top-0 flex items-center gap-5 rounded-sm py-2 px-5 text-white z-40">
            <div className="avatar online">
              <div className="w-10 h-10 rounded-full">
                <img src={activeConversation?.photo} />
              </div>
            </div>
            <div className="">
              <p className="text-lg">{activeConversation?.name}</p>
              <p className="text-xs">{activeConversation?.email}</p>
            </div>
          </div>
          {messages.length > 0 && (
            <div className="min-h-[500px] mb-4 p-4 flex flex-col gap-4 pt-[70px]">
              <hr className="pb-4 border-black" />
              {messages.map((message) => (
                <div
                  key={message._id}
                  className={`chat ${
                    message.sender === "admin" ? "chat-end" : "chat-start"
                  }`}
                >
                  <div className="chat-bubble chat-bubble-warning">
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
          )}
          {messages.length == 0 && (
            <div className="min-h-full flex items-center justify-center">
              <p className="text-xl font-medium select-none">
                No Message from - {activeConversation.userId}
              </p>
            </div>
          )}
          {/* Message input */}
          <div className="flex sticky w-full bottom-0 left-0 bg-black rounded-sm p-2">
            <input
              ref={text}
              type="text"
              className="flex-1 border p-2 rounded-sm"
              placeholder="Type your message..."
            />
            <button
              onClick={sendMessage}
              className="bg-[#FFBE00] text-white p-2 ml-2 rounded-sm"
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
