import { useState } from "react";
import AdminChatBox from "./AdminChatBox";

const AdminChat = () => {
  const [activeConversation, setActiveConversation] = useState(null);
  const users = [
    {
      name: "Akib Rahman",
      email: "akibrahman5200@gmail.com",
      photo: "https://i.ibb.co/8YfgbmZ/Linkdin1.jpg",
    },
    {
      name: "Suchona Islam",
      email: "suchona.islam.shila@gmail.com",
      photo: "https://i.ibb.co/swPt0Sv/IMG-20230102-WA0016.jpg",
    },
    {
      name: "Jhon Denim",
      email: "jhon.denim.web@gmail.com",
      photo: "https://i.ibb.co/yBhSVPW/istockphoto-1399565382-170667a.webp",
    },
  ];
  return (
    <div className="flex gap-4 w-[98%] h-[90vh] conversations-scrollbar">
      <div className="w-1/4 bg-[#141515] text-white p-2 rounded-sm overflow-y-scroll scrollbar-hide">
        {/* Person list */}
        <div className="font-medium rounded-sm mb-10 text-center bg-white text-black py-2">
          Customers
        </div>
        <div className="flex flex-col gap-5">
          {/* Conversations  */}
          {users.map((user, i) => (
            <div
              onClick={() => setActiveConversation(user)}
              key={i}
              className={`flex items-center gap-5 rounded-sm p-2 cursor-pointer ${
                user.email === activeConversation?.email
                  ? "bg-stone-600"
                  : "hover:bg-stone-700"
              }`}
            >
              <img className="w-10 h-10 rounded-full" src={user.photo} alt="" />
              <div className="">
                <p>{user.name}</p>
                <p className="text-[9px]">{user.email}</p>
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
