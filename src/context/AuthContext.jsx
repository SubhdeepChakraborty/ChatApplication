import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import { auth } from "../firebase";

export const AuthContext = createContext();

export const ContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  //Here we are identifying whether the user is present or not and
  //its all done by firebase
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log(user);
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useGlobalHook = () => {
  return useContext(AuthContext);
};
