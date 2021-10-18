import React from "react";
import "./SignInSignUp.css";

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
            <img src="https://images.unsplash.com/photo-1576859958081-27de5c70262a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80" />
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
            <img src="https://ewscripps.brightspotcdn.com/dims4/default/13d048d/2147483647/strip/true/crop/1200x675+0+0/resize/1280x720!/quality/90/?url=http%3A%2F%2Fewscripps-brightspot.s3.amazonaws.com%2F23%2F4b%2F4e6f6e134d10b8ffec21b42ba972%2Fezuc-geumaewwel.jpg" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignInSignUp;
