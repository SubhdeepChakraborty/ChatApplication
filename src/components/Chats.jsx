import React, { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useGlobalHook } from "../context/AuthContext";
import { useChatGlobalHook } from "../context/ChatContext";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useGlobalHook();
  const { dispatch } = useChatGlobalHook();
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  //Converting object into chats
  console.log(Object.entries(chats));

  return (
    <div>
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            key={chat[0]}
            className=" flex items-center p-2 gap-2 pics cursor-pointer hover:bg-[#2f2d52]"
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            <img
              src={chat[1]?.userInfo.photoURL}
              className="h-[50px] w-[50px] rounded-full object-cover"
            />
            <div>
              <span className="text-white text-[18px] font-[Sen] font-[500] hideText ">
                {chat[1]?.userInfo.displayName}
              </span>
              <p className="text-[14px] font-[Sen] text-gray-200 hideText">
                {chat[1]?.lastMessage?.text}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Chats;
