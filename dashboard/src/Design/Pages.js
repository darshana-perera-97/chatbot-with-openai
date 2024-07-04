import React from "react";
import Home from "./Pages/Home";
import { Route, Routes } from "react-router-dom";
import Chats from "./Pages/Chats";
import Contacts from "./Pages/Contacts";
import Customize from "./Pages/Customize";
import Intergrate from "./Pages/Intergrate";
import Profile from "./Pages/Profile";
import Test from "./Pages/Test";
import Knowledge from "./Pages/Knowledge";

export default function Pages() {
  return (
    <div>
      {/* <Home/> */}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/admin" element={<Admin />} /> */}
        <Route path="/chats" element={<Chats />} />
        <Route path="/Contacts" element={<Contacts />} />
        <Route path="/Customize" element={<Customize />} />
        <Route path="/Intergrate" element={<Intergrate />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Test" element={<Test />} />
        <Route path="/Knowledge" element={<Knowledge />} />
      </Routes>
    </div>
  );
}
