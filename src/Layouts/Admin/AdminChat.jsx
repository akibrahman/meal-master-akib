import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Loader from "../../Components/Shared/Loader";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import AdminChatBox from "./AdminChatBox";

const AdminChat = () => {
  const axiosInstance = useAxiosSecure();
  const [activeConversation, setActiveConversation] = useState(null);
  const { data: chats, isLoading } = useQuery({
    queryKey: ["conversations"],
    queryFn: async () => {
      const data = await axiosInstance.get("/all-conversations");
      return data.data;
    },
  });
  if (isLoading || !chats) return <Loader />;
  return (
    <div className="flex gap-4 w-[98%] h-[90vh] conversations-scrollbar">
      <div className="w-1/4 bg-[#141515] text-white p-2 rounded-sm overflow-y-scroll scrollbar-hide">
        {/* Person list */}
        <div className="font-medium rounded-sm mb-10 text-center bg-white text-black py-2">
          Customers
        </div>
        <div className="flex flex-col gap-5">
          {/* Conversations  */}
          {chats.map((chat, i) => (
            <div
              onClick={() => setActiveConversation(chat)}
              key={i}
              className={`flex items-center gap-5 rounded-sm p-2 cursor-pointer ${
                chat.email === activeConversation?.email
                  ? "bg-stone-600"
                  : "hover:bg-stone-700"
              }`}
            >
              <img className="w-10 h-10 rounded-full" src={chat.photo} alt="" />
              <div className="">
                <p>{chat.name}</p>
                <p className="text-[9px]">{chat.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 relative">
        {/* Chat box */}
        <AdminChatBox activeConversation={activeConversation} />
      </div>
    </div>
  );
};

export default AdminChat;
