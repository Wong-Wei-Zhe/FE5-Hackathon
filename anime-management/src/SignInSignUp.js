import "./SignInSignUp.css";
import Jojo1 from "./picture/jojo1.jpeg";
import OnePiece from "./picture/onePiece.jpeg";
import React, { useState, useEffect } from "react";
import { Form, Button } from "semantic-ui-react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router";
import { db } from "./App";
import { collection, addDoc } from "firebase/firestore";

import "react-toastify/dist/ReactToastify.css";
export default function SignInSignUp() {
  const [signUpScreen, setSignUpScreen] = React.useState("");
  let history = useHistory();

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  //   useEffect(() => {
  //     let authToken = sessionStorage.getItem("Auth key");
  //     if (authToken) {
  //       history.push("Home");
  //     }
  //     if (!authToken) {
  //       history.push("/");
  //     }
  //   }, []);

  const handleLogin = () => {
    const authentication = getAuth();
    signInWithEmailAndPassword(authentication, email, password)
      .then((data) => {
        sessionStorage.setItem("Auth key", data._tokenResponse.refreshToken);
        history.push("/home");
        toast.success("Login succesfull", { pauseOnHover: true });
        const user = authentication.currentUser;
        console.log(user.uid);
      })
      .catch(() => {
        toast.error("Incorrect username or password!", { pauseOnHover: true });
      });
  };

  const handleRegister = () => {
    console.log(email);
    console.log(password);
    const authentication = getAuth();
    createUserWithEmailAndPassword(authentication, email, password)
      .then(() => {
        toast.success("Account Registered", { pauseOnHover: true });
        const user = authentication.currentUser;
        console.log(user.uid);
        addDoc(collection(db, "Users", user.uid, "User data:"), {
          UserID: user.uid,
          createdAt: new Date(),
          completed: false,
        });
      })
      .catch((signUpError) => {
        console.log(signUpError);
        toast.error("Email have already been used", { pauseOnHover: true });
      });
  };

  // const handleRegister = () => {
  //   const authentication = getAuth();
  //   createUserWithEmailAndPassword(authentication, email, password)
  //     .then(() => {
  //       toast.success("Account Registered", { pauseOnHover: true });
  //       const user = authentication.currentUser;
  //       console.log(user.uid);
  //       addDoc(collection(db, "Users", user.uid, "User data:"), {
  //         UserID: user.uid,
  //         createdAt: new Date(),
  //         completed: false,
  //       });
  //     })
  //     .catch(() => {
  //       toast.error("Email have already been used", { pauseOnHover: true });
  //     });
  //}
  return (
    <section>
      <div className={`container ${signUpScreen}`}>
        <div className="user signinBx">
          <div className="imgBx">
            <img src={OnePiece} />
          </div>
          <div className="formBx">
            <Form>
              <h2>Sign In</h2>
              <ToastContainer />
              <Form.Field>
                <input
                  type="text"
                  name=""
                  placeholder="Username"
                  onChange={(e) => setemail(e.target.value)}
                />
              </Form.Field>

              <Form.Field>
                <input
                  type="password"
                  name=""
                  placeholder="Password"
                  onChange={(e) => setpassword(e.target.value)}
                />
              </Form.Field>

              <input type="submit" onClick={handleLogin} />
              <p className="signup">
                Don't have an account ?
                <a
                  href="#"
                  onClick={() => {
                    setSignUpScreen("active");
                  }}
                >
                  Sign Up
                </a>
              </p>
              <ToastContainer />
            </Form>
          </div>
        </div>
        <div className="user signupBx">
          <div className="formBx">
            <h2>Create an Account</h2>
            <Form>
              <Form.Field>
                <input
                  type="email"
                  name=""
                  placeholder="Email Id"
                  onChange={(e) => setemail(e.target.value)}
                />
              </Form.Field>
              <Form.Field>
                <input
                  type="password"
                  name=""
                  placeholder="Create Password"
                  onChange={(e) => setpassword(e.target.value)}
                />
              </Form.Field>

              <input
                type="submit"
                name=""
                value="Sign Up"
                onClick={handleRegister}
              />
            </Form>

            <p className="signup">
              Already have an account ?
              <a
                href="#"
                onClick={() => {
                  setSignUpScreen("");
                }}
              >
                {" "}
                Sign In{" "}
              </a>
            </p>
          </div>
          <div className="imgBx">
            <img src={Jojo1} />
          </div>
        </div>
      </div>
    </section>
  );
}
