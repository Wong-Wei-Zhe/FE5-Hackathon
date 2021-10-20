import "./App.css";
import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Pages";
import Sidebar from "./components/Sidebar";
import SearchPage from "./Pages/SearchPage";

function App() {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Router>
      <Sidebar isOpen={isOpen} toggle={toggleSidebar} />
      <Navbar toggle={toggleSidebar} />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/search" component={SearchPage} />
      </Switch>
    </Router>
  );
}

export default App;
