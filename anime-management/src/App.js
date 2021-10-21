import "./App.css";
import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Pages";
import Sidebar from "./components/Sidebar";
import SearchPage from "./Pages/SearchPage";
import AnimeDetails from "./components/anime-details";
import OnHold from "./Pages/OnHold";
import OnGoing from "./Pages/OnGoing";
import Remove from "./Pages/Remove";
import Completed from "./Pages/Completed";

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
        <Route path="/details" component={AnimeDetails} />
        <Route path="/onhold" component={OnHold} />
        <Route path="/ongoing" component={OnGoing} />
        <Route path="/remove" component={Remove} />
        <Route path="/completed" component={Completed} />
      </Switch>
    </Router>
  );
}

export default App;
