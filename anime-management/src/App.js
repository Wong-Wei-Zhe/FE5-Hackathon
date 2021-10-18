import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import "./App.css";
import SignInSignUp from "./SignInSignUp";
import Home from "./Home";

function App() {
  return (
    <BrowserRouter>
      {/* <ul>
        <li>
          <Link to="/UserSignIn">Sign In / Sign Up</Link>
        </li>
      </ul> */}
      <Switch>
        <Route exact path="/UserSignIn">
          <SignInSignUp />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
