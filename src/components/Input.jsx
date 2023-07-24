import React, { useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useGlobalHook } from "../context/AuthContext";
import { useChatGlobalHook } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { storage, db } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useGlobalHook();
  const { data } = useChatGlobalHook();

  const handleSend = async () => {
    if (img) {
      //Create a unique image name
      // const date = new Date().getTime();
      const storageRef = ref(storage, uuid());

      await uploadBytesResumable(storageRef, img).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          } catch (err) {
            console.log(err);
          }
        });
      });
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };

  return (
    <div className="h-[60px] bg-white p-5 flex items-center justify-between">
      <div className="w-[100%]">
        <input
          type="text"
          placeholder="Say Hello..."
          className="w-[70%] p-1 font-[Sen] outline-none input"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
      </div>
      <div className="flex gap-2">
        <div>
          <input
            type="file"
            onChange={(e) => setImg(e.target.files[0])}
            className="hidden"
            id="file"
          />
          <label htmlFor="file">
            <AddPhotoAlternateIcon className="cursor-pointer" />
          </label>
        </div>
        <div>
          <button
            onClick={handleSend}
            className="ml-1 bg-[#525fe1] p-1 rounded px-1 text-sm font-semibold text-white"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Input;
