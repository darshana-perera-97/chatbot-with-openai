import React from "react";
import Chatbot from "./Chatbot";
import CustomNavbar from "./Components/CustomNavbar";
import MainBanner from "./Components/MainBanner";

export default function LandingPage() {
  return (
    <div>
      <CustomNavbar />
      <h1 className="text-center mt-5 mb-5">
        This will be the website of the chatbot owner client
      </h1>
      <MainBanner />
    </div>
  );
}
