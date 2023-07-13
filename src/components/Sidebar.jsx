import React, { useState } from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";
import { ChatContext, useChatGlobalHook } from "../context/ChatContext";

const Sidebar = () => {
  const { open } = useChatGlobalHook();
  console.log(open);

  return (
    <>
      {open && (
        <div className="flex-[1]  bg-[#3e3c61]  relative">
          <Navbar />
          <Search />
          <Chats />
        </div>
      )}
    </>
  );
};

export default Sidebar;
