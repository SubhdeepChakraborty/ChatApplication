import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import { useGlobalHook } from "../context/AuthContext";

const Navbar = () => {
  const { currentUser } = useGlobalHook();
  // console.log(currentUser.photoURL);
  return (
    <div className="flex items-center justify-between p-5  bg-[#2f2d52] h-[60px]">
      <div>
        <span className="font-[Sen] text-lg logo text-white">Fire Chat</span>
      </div>
      <div className="flex items-center p-2 justify-center Lbutton gap-2">
        <div className="pic">
          <img
            src={currentUser.photoURL}
            className="h-[45px] w-[45px] rounded-full object-cover"
          />
        </div>
        <div className="">
          <Link to="/login">
            <button
              onClick={() => signOut(auth)}
              className="ml-1 bg-[#525fe1] p-1 rounded px-1 text-sm font-semibold text-white"
            >
              Logout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
