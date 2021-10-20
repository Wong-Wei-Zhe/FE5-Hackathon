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
  NavSearchBtn,
} from "./NavbarElement";

const Navbar = (props) => {
  const SearchAnime = async () => {
    const result = await fetch(
      "https://api.jikan.moe/v3/search/anime?q=naruto" // + animeName
    );

    const searchResult = await result.json();

    console.log(searchResult);
    console.log(searchResult.results[1].title);
  };

  return (
    <div>
      <Nav>
        <NavLink to="/">
          <NavSpan>m</NavSpan>
          <NavHome>ANIME</NavHome>
          <NavSpan>nt</NavSpan>
        </NavLink>
        <NavMenu>
          <NavSearch placeholder="Search" />
          <NavLink to="/search" onClick={SearchAnime}>
            SEARCH
          </NavLink>
        </NavMenu>
        <Bars onClick={props.toggle} />
        <NavBtn>
          <NavBtnLink to="/signin">Sign In</NavBtnLink>
        </NavBtn>
      </Nav>
    </div>
  );
};

export default Navbar;
