import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Something went wrong. Please try again");
    }
  };

  return (
    <div className="bg-[#525FE1] h-[100vh] w-[100vw] overflow-hidden">
      <div className="h-full w-full flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex rounded-md items-center relative justify-center overflow-hidden flex-col bg-white w-[420px] h-[320px]"
        >
          <div className="absolute top-5">
            <h1 className="font-[Sen] font-semibold text-4xl">Fire Chat</h1>
          </div>
          <div className="absolute top-16">
            <span className="text-sm font-[Sen]">Login</span>
          </div>
          <div>
            <form
              className="flex p-5 flex-col mt-[4rem] items-center justify-center"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                placeholder="email"
                className="p-2 px-2 w-[300px] outline-none font-[Sen] border-b-2
                 border-b-slate-600 mt-[1rem] mb-[1rem]"
              />
              <input
                type="text"
                placeholder="password"
                className="p-2 px-2 w-[300px] mb-[1rem] outline-none font-[Sen] border-b-2 border-b-slate-600"
              />
              <button className="p-2 px-2 w-[300px] mb-[1rem] outline-none text-white font-semibold font-[Sen] bg-[#525FE1]">
                {" "}
                Sign in
              </button>
              <div className="text-sm font-[Sen]">
                <span>
                  You don't have an account?
                  <Link to="/register">
                    <span className="ml-[2px] font-bold text-purple-900 underline">
                      Register
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

export default Login;
