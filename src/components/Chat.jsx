import React from "react";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Messages from "./Messages";
import Input from "./Input";
import { useChatGlobalHook } from "../context/ChatContext";
import LastPageIcon from "@mui/icons-material/LastPage";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";

const Chat = () => {
  const { data, open, setOpen } = useChatGlobalHook();
  console.log(open);

  return (
    <div className="w-[100%] width relative">
      <div
        className={` bg-[#3e3c61] sm:w-[60%] lg:w-[40%] h-[100%] z-[99] absolute ${
          open ? "XDivX" : "xDiv"
        } `}
      >
        <Navbar />
        <Search />
        <Chats />
      </div>
      <div className="h-[60px] flex items-center justify-between bg-[#5d5b8d] p-5">
        <div>
          <div className={`text-white inline-block gap-1`}>
            <LastPageIcon
              className="cursor-pointer"
              onClick={() => setOpen(true)}
            />
          </div>

          <span className="text-gray-200 text-[18px] font-[Sen] font-[500] ">
            {data?.user?.displayName}
          </span>
        </div>
        <div className="flex gap-2 text-gray-200">
          <div>
            <VideoCallIcon className="cursor-pointer" />
          </div>
          <div>
            <PersonAddAlt1Icon className="cursor-pointer" />
          </div>
          <div>
            <MoreHorizIcon className="cursor-pointer" />
          </div>
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
