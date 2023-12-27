import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import Loader from "../../Components/Shared/Loader";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useUser from "../../Hooks/useUser";

const UserChat = () => {
  const { user, refetch } = useUser();
  const axiosInstance = useAxiosSecure();
  const scroll = useRef();
  const { data: messages } = useQuery({
    queryKey: [user?._id, "messages"],
    queryFn: async ({ queryKey }) => {
      const data = await axiosInstance.get(`/user-messages/${queryKey[0]}`);
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
  }, []);

  if (!user || !messages) return <Loader />;

  return (
    <div className="flex gap-4 w-[950px] h-[90vh] conversations-scrollbar">
      {user.isChatted ? (
        <div
          ref={scroll}
          className="overflow-y-scroll rounded h-full w-full bg-white relative border-l border-black"
        >
          <div className="bg-black sticky top-0 flex items-center gap-5 rounded-sm py-2 px-5 text-white">
            {/* <div className=""> */}
            <div className="">
              <p className="text-lg">Admin Panel</p>
            </div>
            {/* </div> */}
          </div>
          {/* Messages */}
          {messages.length > 0 && (
            <div className="min-h-[500px] mb-4 p-4 flex flex-col pt-[90px]">
              {messages.map((message) => (
                // <div
                //   key={message.id}
                //   className={`mb-2 bg-black text-white px-3 py-1 font-medium w-max max-w-xs text-center rounded-md ${
                //     message.sender === "Person 1" ? "self-start" : "self-end"
                //   }`}
                // >
                //   {message.text}
                // </div>
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
              type="text"
              className="flex-1 border p-2 rounded-sm"
              placeholder="Type your message..."
            />
            <button className="bg-[#FFBE00] text-white p-2 ml-2 rounded-sm">
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
