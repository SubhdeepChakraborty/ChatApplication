import React, { useState } from "react";
import "./home.scss";
import { Chat, Sidebar } from "../../components";

const Home = () => {
  return (
    <div className="home">
      <div className="container">
        {/* <Sidebar /> */}
        <Chat />
      </div>
    </div>
  );
};

export default Home;
