import logo from "./logo.svg";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Chatbot from "./Design/Chatbot";
import Chat2 from "./Design/Chat2";
import ChatIdList from "./Design/ChatIdList";
import LandingPage from "./Design/LandingPage";
import Login from "./Design/Login";
import MobileApp from "./Design/MobileApp";
import HomePage from "./Design/Pages/HomePage";
import Admin from "./Design/Pages/Admin";

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>

      {/* <Chatbot /> */}
      {/* <Chat2 /> */}
      {/* <ChatIdList /> */}
      {/* <LandingPage /> */}
      {/* <Login /> */}
      {/* <MobileApp /> */}
    </div>
  );
}

export default App;
