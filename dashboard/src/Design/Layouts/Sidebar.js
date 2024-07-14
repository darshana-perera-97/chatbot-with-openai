import React, { useState } from "react";
import { Nav } from "react-bootstrap";

const Sidebar = (prop) => {
  const [activeTab, setActiveTab] = useState(prop.data);

  const handleSelect = (selectedKey) => {
    setActiveTab(selectedKey);
  };

  return (
    <div className="sidebar">
      <Nav defaultActiveKey="/" className="flex-column" onSelect={handleSelect}>
        <Nav.Link
          href="/"
          eventKey="/"
          className={activeTab === "/home" ? "active-tab" : ""}
        >
          Analytics
        </Nav.Link>
        <Nav.Link
          href="/chats"
          eventKey="/chats"
          className={activeTab === "/chats" ? "active-tab" : ""}
        >
          Chats
        </Nav.Link>
        <Nav.Link
          href="/Contacts"
          eventKey="/Contacts"
          className={activeTab === "/Contacts" ? "active-tab" : ""}
        >
          Contacts
        </Nav.Link>
        <Nav.Link
          href="/Knowledge"
          eventKey="/Knowledge"
          className={activeTab === "/Knowledge" ? "active-tab" : ""}
        >
          Knowledge
        </Nav.Link>
        <Nav.Link
          href="/Customize"
          eventKey="/Customize"
          className={activeTab === "/Customize" ? "active-tab" : ""}
        >
          Customize
        </Nav.Link>
        <Nav.Link
          href="/Test"
          eventKey="/Test"
          className={activeTab === "/Test" ? "active-tab" : ""}
        >
          Test
        </Nav.Link>
        <Nav.Link
          href="/Intergrate"
          eventKey="/Integrate"
          className={activeTab === "/Integrate" ? "active-tab" : ""}
        >
          Intergrate
        </Nav.Link>
        <Nav.Link
          href="/profile"
          eventKey="/profile"
          className={activeTab === "/Profile" ? "active-tab" : ""}
        >
          Profile
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
