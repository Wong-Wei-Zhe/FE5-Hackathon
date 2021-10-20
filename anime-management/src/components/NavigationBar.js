import React from "react";
import "../NavigationBar.css";

function NavigationBar() {
  return (
    <div>
      <ul>
        <li>
          <button className="teal buttonsize" onclick="w3_open()">
            ☰
          </button>
        </li>
        <li>
          <a href="#home">Home</a>
        </li>
        <li>
          <a href="#news">News</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
        <li>
          <a href="#dd">DD</a>
        </li>
        <li style="float:right">
          <div class="search-container">
            <form>
              <input type="text" placeholder="Search.." name="search" />
              <button type="submit">Submit</button>
            </form>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default NavigationBar;
