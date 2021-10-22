import React from "react";
// import Search from "../Search";
import {
  NavLink,
  Nav,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
  NavHome,
  NavSpan,
  NavSearch,
  // NavSearchBtn,
} from "./NavbarElement";

const Navbar = (props) => {
  const [searchName, setSearchName] = React.useState("");
  return (
    <div>
      <Nav>
        <NavLink to="/home">
          <NavSpan>m</NavSpan>
          <NavHome>ANIME</NavHome>
          <NavSpan>nt</NavSpan>
        </NavLink>
        <NavMenu>
          <NavSearch
            placeholder="Can't Find Your Anime?"
            onChange={(event) => {
              setSearchName(event.target.value);
            }}
          />
          <NavLink
            to={{
              pathname: "/search",
              state: { animeName: searchName },
            }}
          >
            SEARCH
          </NavLink>
        </NavMenu>
        <Bars onClick={props.toggle} />
        <NavBtn>
          <NavBtnLink to="/signin">Sign Out</NavBtnLink>
        </NavBtn>
      </Nav>
    </div>
  );
};

export default Navbar;
