import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import Loader from "../../Components/Shared/Loader";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useUser from "../../Hooks/useUser";

const UserChat = () => {
  const { user, refetch } = useUser();
  const axiosInstance = useAxiosSecure();
  const [onlineUsers, setOnlineUsers] = useState([]);
  // const [messages, setMessages] = useState([]);
  // const [newSentMessage, setNewSentMessage] = useState("");
  const scroll = useRef();
  const text = useRef();
  const socket = useRef();

  //! Socket Setup
  useEffect(() => {
    socket.current = io(import.meta.env.VITE_socketUrl);
    socket.current.emit("new-user-add", user?.email);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  const { data: messages, refetch: messagesRefetch } = useQuery({
    queryKey: [user?._id, "messages"],
    queryFn: async ({ queryKey }) => {
      const data = await axiosInstance.get(`/user-messages/${queryKey[0]}`);
      return data.data;
    },
  });

  //!Receiving msg by Socket
  useEffect(() => {
    socket.current.on("to-user", async () => {
      await messagesRefetch();
    });
  });

  const { data: conversation } = useQuery({
    queryKey: [user?._id, "conversation"],
    queryFn: async ({ queryKey }) => {
      const data = await axiosInstance.get(`/user-conversation/${queryKey[0]}`);
      return data.data;
    },
  });

  const createConversation = async () => {
    try {
      await axiosInstance.post("/conversation", {
        userId: user._id,
      });
      await axiosInstance.patch(`/user-chatting/${user._id}`);
      refetch();
      toast.success("Conversation Created");
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (scroll.current) {
      scroll.current.scrollTop = scroll.current.scrollHeight;
    }
  });

  const sendMessage = async () => {
    const data = {
      conversationId: conversation._id,
      sender: user._id,
      receiver: "admin",
      text: text.current.value,
    };
    text.current.value = "";
    await axiosInstance.post("/send-message", data);
    await messagesRefetch();
    //! Sending msg by Socket to Admin
    socket.current.emit("to-admin", data);
  };

  if (!user || !messages || !conversation) return <Loader />;

  return (
    <div className="flex gap-4 w-[90%] h-[90vh] conversations-scrollbar">
      {user.isChatted ? (
        <div
          ref={scroll}
          className="overflow-y-scroll rounded h-full w-full bg-white relative border-l border-black"
        >
          <div className="bg-black sticky top-0 flex items-center gap-5 rounded-sm py-2 px-5 text-white z-40">
            {/* <div className=""> */}
            <div className="">
              <p className="text-lg">Admin Panel</p>
            </div>
            {/* </div> */}
          </div>
          {/* Messages */}
          {messages.length > 0 && (
            <div className="min-h-[500px] mb-4 p-4 flex flex-col gap-4 pt-[90px]">
              {messages.map((message) => (
                <div
                  key={message._id}
                  className={`chat ${
                    message.receiver === "admin" ? "chat-end" : "chat-start"
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
                Start chat with us
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
        <div className="w-full h-full flex flex-col gap-5 items-center justify-center border border-black">
          <p className="text-xl font-medium select-none">
            Click below to start conversation with Admins
          </p>
          <button
            onClick={createConversation}
            className="bg-[#FFBE00] px-3 text-black py-2 rounded-sm font-medium duration-300 active:scale-90"
          >
            Start Chat
          </button>
        </div>
      )}
    </div>
  );
};

export default UserChat;
