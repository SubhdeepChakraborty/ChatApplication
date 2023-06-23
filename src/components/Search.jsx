import React, { useState } from "react";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { useGlobalHook } from "../context/AuthContext";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useGlobalHook();

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUsername("");
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  console.log(username);
  console.log(user);

  return (
    <div className=" border-b-2 text-white border-b-gray-500">
      <div>
        <input
          type="text"
          placeholder="Find a user"
          className="w-full p-2 px-2 bg-transparent outline-none"
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKey}
          value={username}
        />
      </div>
      {err && <span>User not found!</span>}
      {user && (
        <div
          className=" flex items-center p-2 gap-2 pics cursor-pointer hover:bg-[#2f2d52]"
          onClick={handleSelect}
        >
          <img
            src={user.photoURL}
            className="h-[50px] w-[50px] rounded-full object-cover"
          />
          <div>
            <span className="text-white text-[18px] font-[Sen] font-[500] hideText ">
              {user.displayName}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
