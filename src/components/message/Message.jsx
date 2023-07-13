import React, { useEffect, useRef } from "react";
import "./message.scss";
import { useGlobalHook } from "../../context/AuthContext";
import { useChatGlobalHook } from "../../context/ChatContext";
import { motion } from "framer-motion";

const Message = ({ message }) => {
  const { currentUser } = useGlobalHook();
  const { data } = useChatGlobalHook();

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`flex gap-3 mb-[20px] message ${
        message.senderId === currentUser.uid && "owner"
      }`}
    >
      <div className="messageInfo flex flex-col items-center justify-center text-gray-500 font-[300]">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          className="h-[45px] w-[45px] rounded-full object-cover"
        />
        <span className="hide">Just Now</span>
      </div>
      <div className="messageContent max-w-[80%] flex flex-col gap-[10px] ">
        <p>{message.text}</p>
        {message.img && <img src={message.img} className="w-[50%]" />}
      </div>
    </div>
  );
};

export default Message;
