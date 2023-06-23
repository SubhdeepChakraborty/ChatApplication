import React from "react";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Messages from "./Messages";
import Input from "./Input";
import { useChatGlobalHook } from "../context/ChatContext";

const Chat = () => {
  const { data } = useChatGlobalHook();

  return (
    <div className="flex-[2] width">
      <div className="h-[60px] flex items-center justify-between bg-[#5d5b8d] p-5">
        <div>
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
