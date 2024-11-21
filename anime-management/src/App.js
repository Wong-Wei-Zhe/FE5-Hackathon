
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Pages";
import SearchPage from "./Pages/SearchPage";
import AnimeDetails from "./components/anime-details";
import OnHold from "./Pages/OnHold";
import OnGoing from "./Pages/OnGoing";
import Remove from "./Pages/Remove";
import Completed from "./Pages/Completed";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import SignInSignUp from "./SignInSignUp";
const firebaseConfig = {
  apiKey: "AIzaSyCs3N_wVd-9kAiB0qOGSJ4YdYhqkpmzoQ4",
  authDomain: "fe-project-d5662.firebaseapp.com",
  projectId: "fe-project-d5662",
  storageBucket: "fe-project-d5662.appspot.com",
  messagingSenderId: "439558369352",
  appId: "1:439558369352:web:251b5c57f99a08a1b6287d",
  measurementId: "G-7MK6LDQ2H5",
};
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/home" exact component={Home} />
        <Route path="/search" component={SearchPage} />
        <Route path="/details" component={AnimeDetails} />
        <Route path="/onhold" component={OnHold} />
        <Route path="/ongoing" component={OnGoing} />
        <Route path="/remove" component={Remove} />
        <Route path="/completed" component={Completed} />
        <Route path="/" component={SignInSignUp} />
      </Switch>
    </Router>
  );
}

export default App;
export { db };
