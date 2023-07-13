import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import { useGlobalHook } from "../context/AuthContext";
import LogoutIcon from "@mui/icons-material/Logout";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import { useChatGlobalHook } from "../context/ChatContext";
const Navbar = () => {
  const { currentUser } = useGlobalHook();
  const { setOpen } = useChatGlobalHook();

  return (
    <div className="flex items-center justify-between p-3 bg-[#2f2d52] ">
      <div className="chat">Fire Chat</div>
      <div className="flex items-center justify-center gap-4">
        <div className="picImage">
          <LazyLoadImage
            src={currentUser.photoURL}
            className="h-[45px] w-[45px] rounded-full object-cover"
            effect="blur"
            threshold={100}
          />
        </div>
        <div className="icon text-white">
          <FirstPageIcon
            className="cursor-pointer"
            onClick={() => setOpen(false)}
          />
          <LogoutIcon
            className="cursor-pointer absolute bottom-3 right-3"
            onClick={() => signOut(auth)}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
