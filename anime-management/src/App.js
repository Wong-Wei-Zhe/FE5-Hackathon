import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import "./App.css";
import SignInSignUp from "./components/SignInSignUp";
import NavigationBar from "./components/NavigationBar";
import Home from "./Home";

function App() {
  return (
    <BrowserRouter>
      <ul>
        <li>
          <Link to="/UserSignIn">Sign In / Sign Up</Link>
        </li>
        <li>
          <Link to="/Navigation">Navigation Bar</Link>
        </li>
      </ul>
      <Switch>
        <Route exact path="/UserSignIn">
          <SignInSignUp />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/Navigation">
          <NavigationBar />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
