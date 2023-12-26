import ChatBox from "./ChatBox";

const UserChat = () => {
  return (
    <div className="flex gap-4 w-[98%] h-[90vh] conversations-scrollbar">
      <div className="w-1/4 bg-[#141515] text-white p-2 rounded-sm overflow-y-scroll scrollbar-hide">
        {/* Person list */}
        <div className="font-medium rounded-sm mb-10 text-center bg-white text-black py-2">
          Customers
        </div>
        <div className="flex flex-col gap-5">
          {/* Conversations  */}
          <div className="flex items-center gap-5 bg-stone-500 rounded-sm p-2">
            <img
              className="w-10 h-10 rounded-full"
              src="https://i.ibb.co/8YfgbmZ/Linkdin1.jpg"
              alt=""
            />
            <div className="">
              <p>Akib Rahman</p>
              <p className="text-[9px]">akibrahman5200@gmail.com</p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-2">
            <img
              className="!w-10 h-10 rounded-full"
              src="https://i.ibb.co/swPt0Sv/IMG-20230102-WA0016.jpg"
              alt=""
            />
            <div className="">
              <p>Suchona Islam</p>
              <p className="text-[9px]">suchona.islam.shila@gmail.com</p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-2">
            <img
              className="w-10 h-10 rounded-full"
              src="https://i.ibb.co/yBhSVPW/istockphoto-1399565382-170667a.webp"
              alt=""
            />
            <div className="">
              <p>Jhon Denim</p>
              <p className="text-[9px]">jhon.denim.web@gmail.com</p>
            </div>
          </div>
          {/* sdhljsjdlsdlsdlsdklsdjkl  */}
          <div className="flex items-center gap-5 p-2">
            <img
              className="w-10 h-10 rounded-full"
              src="https://i.ibb.co/yBhSVPW/istockphoto-1399565382-170667a.webp"
              alt=""
            />
            <div className="">
              <p>Jhon Denim</p>
              <p className="text-[9px]">jhon.denim.web@gmail.com</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-2">
            <img
              className="w-10 h-10 rounded-full"
              src="https://i.ibb.co/yBhSVPW/istockphoto-1399565382-170667a.webp"
              alt=""
            />
            <div className="">
              <p>Jhon Denim</p>
              <p className="text-[9px]">jhon.denim.web@gmail.com</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-2">
            <img
              className="w-10 h-10 rounded-full"
              src="https://i.ibb.co/yBhSVPW/istockphoto-1399565382-170667a.webp"
              alt=""
            />
            <div className="">
              <p>Jhon Denim</p>
              <p className="text-[9px]">jhon.denim.web@gmail.com</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-2">
            <img
              className="w-10 h-10 rounded-full"
              src="https://i.ibb.co/yBhSVPW/istockphoto-1399565382-170667a.webp"
              alt=""
            />
            <div className="">
              <p>Jhon Denim</p>
              <p className="text-[9px]">jhon.denim.web@gmail.com</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-2">
            <img
              className="w-10 h-10 rounded-full"
              src="https://i.ibb.co/yBhSVPW/istockphoto-1399565382-170667a.webp"
              alt=""
            />
            <div className="">
              <p>Jhon Denim</p>
              <p className="text-[9px]">jhon.denim.web@gmail.com</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-2">
            <img
              className="w-10 h-10 rounded-full"
              src="https://i.ibb.co/yBhSVPW/istockphoto-1399565382-170667a.webp"
              alt=""
            />
            <div className="">
              <p>Jhon Denim</p>
              <p className="text-[9px]">jhon.denim.web@gmail.com</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-2">
            <img
              className="w-10 h-10 rounded-full"
              src="https://i.ibb.co/yBhSVPW/istockphoto-1399565382-170667a.webp"
              alt=""
            />
            <div className="">
              <p>Jhon Denim</p>
              <p className="text-[9px]">jhon.denim.web@gmail.com</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-2">
            <img
              className="w-10 h-10 rounded-full"
              src="https://i.ibb.co/yBhSVPW/istockphoto-1399565382-170667a.webp"
              alt=""
            />
            <div className="">
              <p>Jhon Denim</p>
              <p className="text-[9px]">jhon.denim.web@gmail.com</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-2">
            <img
              className="w-10 h-10 rounded-full"
              src="https://i.ibb.co/yBhSVPW/istockphoto-1399565382-170667a.webp"
              alt=""
            />
            <div className="">
              <p>Jhon Denim</p>
              <p className="text-[9px]">jhon.denim.web@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 relative">
        {/* Chat box */}
        <ChatBox />
      </div>
    </div>
  );
};

export default UserChat;
