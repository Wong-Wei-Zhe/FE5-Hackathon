import React from "react";
import "../SignInSignUp.css";
import Jojo1 from "../picture/jojo1.jpg";
import NarutoShippuden from "../picture/narutoShippuden.png";

function SignInSignUp() {
  const [signUpScreen, setSignUpScreen] = React.useState("");

  /*function toggleForm() {
    var container = document.querySelector(".container");
    container.classList.toggle("active");
  }*/

  //   const toggleForm = () => {
  //     setSignUpScreen("active");
  //     // var container = document.querySelector(".container");
  //     // container.classList.toggle("active");
  //   };

  //html section
  return (
    <section>
      <div className={`container ${signUpScreen}`}>
        <div className="user signinBx">
          <div className="imgBx">
            <img src={NarutoShippuden} />
          </div>
          <div className="formBx">
            <form>
              <h2>Sign In</h2>
              <input type="text" name="" placeholder="Username" />
              <input type="password" name="" placeholder="Password" />
              <input type="submit" name="" value="Login" />
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
            </form>
          </div>
        </div>
        <div className="user signupBx">
          <div className="formBx">
            <form>
              <h2>Create an Account</h2>
              <input type="text" name="" placeholder="Username" />
              <input type="email" name="" placeholder="Email Id" />
              <input type="password" name="" placeholder="Create Password" />
              <input type="password" name="" placeholder="Confirm Password" />
              <input type="submit" name="" value="Sign Up" />
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
            </form>
          </div>
          <div className="imgBx">
            <img src={Jojo1} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignInSignUp;
