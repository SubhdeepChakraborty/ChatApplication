import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useReducer } from "react";
import { useState } from "react";
import { auth } from "../firebase";
import { useGlobalHook } from "./AuthContext";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const { currentUser } = useGlobalHook();

  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
  const [open, setOpen] = useState(false);

  return (
    <ChatContext.Provider value={{ data: state, dispatch, open, setOpen }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatGlobalHook = () => {
  return useContext(ChatContext);
};
