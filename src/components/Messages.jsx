import React from "react";
import Message from "./message/Message";
import { useChatGlobalHook } from "../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useState, useEffect } from "react";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useChatGlobalHook();

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  console.log(messages);
  return (
    <div className="bg-[#ddddf7] p-5 messages overflow-y-scroll">
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
};

export default Messages;
