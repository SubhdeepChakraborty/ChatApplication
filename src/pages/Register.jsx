import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#525FE1] h-[100vh] w-[100vw] overflow-hidden">
      <div className="h-full w-full flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col p-5 items-center relative justify-center bg-white h-[450px] w-[350px]"
        >
          <div className="absolute top-[1rem]">
            <span className="font-[Sen] text-2xl font-bold">Fire Chat</span>
          </div>

          <div className="p-5 mt-[1rem]">
            <form
              className="flex flex-col items-center justify-center"
              onSubmit={handleSubmit}
            >
              <input
                required
                type="text"
                placeholder="display name"
                // name="name"
                // onChange={handleChange}
                className="p-2 px-2 w-[300px] outline-none font-[Sen] border-b-2
                 border-b-slate-600 mt-[1rem] mb-[1rem]"
              />
              <input
                required
                type="email"
                placeholder="email"
                // name="email"
                // onChange={handleChange}
                className="p-2 px-2 w-[300px] outline-none font-[Sen] border-b-2
                 border-b-slate-600 mb-[1rem]"
              />
              <input
                required
                type="password"
                placeholder="password"
                // name="password"
                // onChange={handleChange}
                className="p-2 px-2 w-[300px] outline-none font-[Sen] border-b-2
                 border-b-slate-600  mb-[1rem]"
              />
              <input type="file" id="file" className="hidden" />
              <label
                htmlFor="file"
                className="cursor-pointer mb-[1rem] flex items-center text-[#525FE1]/[0.4] p-1"
              >
                <img src="/addAvatar.png" className="h-[32px] w-[32px]" />{" "}
                <span className="text-lg font-semibold mr-[8rem]">
                  Add an avatar
                </span>
              </label>
              <button className="p-2 px-2 w-[300px] mb-[1rem] outline-none text-white font-semibold font-[Sen] bg-[#525FE1]">
                {" "}
                Sign up
              </button>
              {loading && "Uploading and compressing the image please wait..."}
              {err && <span>Something went wrong</span>}
              <div className="text-sm font-[Sen]">
                <span>
                  You do have an account?
                  <Link to="/login">
                    <span className="ml-[2px] font-bold text-purple-900 underline">
                      Login
                    </span>
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
