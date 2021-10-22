import React from "react";
import "../HeadingsMenu.css";

function HeadingsMenu() {
  var header = document.getElementById("myDIV");
  var btns = document.getElementsByClassName("btn");
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
      var current = document.getElementsByClassName("active");
      if (current.length > 0) {
        current[0].className = current[0].className.replace(" active", "");
      }
      this.className += " active";
    });
  }

  return (
    <div>
      <p className="spacing"> v</p>
      <div id="myDIV">
        <ul>
          <li>
            <a className="btn">TOP WATCH</a>
          </li>

          <li>
            <a className="btn">ONGOING</a>
          </li>

          <li>
            <a className="btn">ON HOLD</a>
          </li>

          <li>
            <a className="btn">COMPLETED</a>
          </li>

          <li>
            <a className="btn">MORE&gt;</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default HeadingsMenu;
