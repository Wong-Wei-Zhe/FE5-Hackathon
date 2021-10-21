import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import "./App.css";
import SignInSignUp from "./components/SignInSignUp";

function Home() {
  return (
    <>
      {/* <ul>
        <li>
          <Link to="/UserSignIn">Sign In / Sign Up</Link>
        </li>
      </ul> */}
      {/* <Layout> */}
      <div style={{ height: "100%", width: "100%", color: "skyblue" }}>
        <h1>Welcome home</h1>
      </div>
      {/* </Layout> */}
    </>
  );
}

export default Home;
