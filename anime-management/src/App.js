import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import "./App.css";
import SignInSignUp from "./components/SignInSignUp";
import Home from "./Home";
import HeadingsMenu from "./components/HeadingsMenu";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
    </Router>
  );
}

export default App;
