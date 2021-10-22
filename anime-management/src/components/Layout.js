import { Zoom } from "react-toastify";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import React from "react";

const Layout = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggleSidebar} />
      <Navbar toggle={toggleSidebar} />

      {props.children}

      <footer></footer>
    </>
  );
};

export default Layout;
