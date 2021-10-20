import styled, { keyframes } from "styled-components";
import { NavLink as Link } from "react-router-dom";
import { FaBars, FaSearch } from "react-icons/fa";

export const Nav = styled.nav`
  background: #000;
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem calc((100vw - 1000px) / 2);
  z-index: 10;
`;

export const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;

  &.active {
    color: #15cdfc;
  }
`;

export const NavSearch = styled.input`
  height: 40px;
  width: 400px;
  font-size: 16px;
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
  padding-left: 10px;
  border: none;
`;

export const NavSearchBtn = styled(FaSearch)`
  font-size: 1.8rem;
  background: #fff;
  height: 40px;
  width: 60px;
  color: black;
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  border: none;
  cursor: pointer;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #e5dfe8;
    color: #010606;
  }
`;

// const breatheAnimation = keyframes`
// from {
//     text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #e60073, 0 0 40px #e60073, 0 0 30px #e60073, 0 0 20px #fff, 0 0 10px #fff;
//   }
//   to {
//     text-shadow: 0 0 20px #fff, 0 0 30px #ff4da6, 0 0 40px #ff4da6, 0 0 50px #ff4da6, 0 0 40px #ff4da6, 0 0 30px #ff4da6, 0 0 20px #fff;
//   }
// `;

const flickerAnimation = keyframes`
  0%, 18%, 22%, 25%, 53%, 57%, 100% {

      text-shadow:
      0 0 4px #fff,
      0 0 11px #fff,
      0 0 19px #fff,
      0 0 40px #0fa,
      0 0 80px #0fa,
      0 0 90px #0fa,
      0 0 100px #0fa,
      0 0 150px #0fa;
  
  }
  
  20%, 24%, 55% {        
      text-shadow: none;
  } 
`;

// const typeWritter = keyframes`
//   from { width: 0 }
//   to { width: 100% }
// `;

export const NavSpan = styled.h1`
  font-size: 35px;
  color: #15cdfc;
  text-shadow:
      0 0 7px #15cdfc,
      0 0 10px #15cdfc,
      0 0 21px #15cdfc,
      0 0 42px #0fa,
      0 0 82px #0fa,
      0 0 92px #0fa,
      0 0 102px #0fa,
      0 0 151px #0fa;
}
`;

export const NavHome = styled.h1`
  font-size: 40px;
  color: #fff;
  text-shadow:
      0 0 7px #fff,
      0 0 10px #fff,
      0 0 21px #fff,
      0 0 42px #0fa,
      0 0 82px #0fa,
      0 0 92px #0fa,
      0 0 102px #0fa,
      0 0 151px #0fa;
}
  animation: ${flickerAnimation} 1.5s infinite alternate;
`;

export const Bars = styled(FaBars)`
  display: none;
  color: #fff;

  @media screen and (max-width: 845px) {
    display: block;
    padding-top: 0px;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;

  @media screen and (max-width: 845px) {
    display: none;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;

  @media screen and (max-width: 845px) {
    display: none;
  }
`;

export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: #256ce1;
  padding: 10px 22px;
  color: #fff;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`;
