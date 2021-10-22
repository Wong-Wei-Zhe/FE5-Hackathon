import Styled, { keyframes } from "styled-components";
import { Link as LinkR } from "react-router-dom";

export const CardContainerElements = Styled.div`
    display: block;
    margin-left: 10px;
    margin-right: 10px;
    cursor: pointer;
    @media screen and (max-width: 1200px){
        -webkit-box-flex: 0;
        flex: 0 0 33.3333333333%;
        max-width: 33.3333333333%;
    }
    @media screen and (max-width: 768px){
        -webkit-box-flex: 0;
        flex: 0 0 50%;
        max-width: 50%;
    }
    @media screen and (max-width: 540px){
        -webkit-box-flex: 0;
        flex: 0 0 50%;
        max-width: 50%;
    }
    @media screen and (max-width: 500px){
        -webkit-box-flex: 0;
        flex: 0 0 70%;
        max-width: 70%;
    }
    @media screen and (max-width: 400px){
        -webkit-box-flex: 0;
        flex: 0 0 80%;
        max-width: 80%;
    }
    @media screen and (max-width: 340px){
        -webkit-box-flex: 0;
        flex: 0 0 94.5%;
        max-width: 94.5%;
    }
`;

const FadeIn = keyframes`
  0% {opacity:0;};
  100% {opacity:1;};
`;

export const CardContainer = Styled(LinkR)`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 500px;
  word-wrap: break-word;
  background-color: #33383d;
  border: 0 solid rgba(0, 0, 0, 0.6);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
  margin-bottom: 1.5rem;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  animation: ${FadeIn} 2s;

  &:hover{
      transform: scale(1.03);
      background-color: #484f57;
    z-index: 1;
    position:relative;
  }
    @media screen and (max-width: 1200px){
        width: 200px
        height: 400px
    }
    @media screen and (max-width: 768px){
        width: 200px
        height: 400px
    }
    @media screen and (max-width: 540px){
        width: 200px
        height: 400px
    }
    @media screen and (max-width: 417px){
        width: 300px
        height: 400px
    }
`;

export const CardImageWrapper = Styled.div`
  position: relative;
  display: block;
`;

export const CardImage = Styled.img`
  width: 100%;
  border-top-left-radius: calc(0.25rem - 1px);
  border-top-right-radius: calc(0.25rem - 1px);
  height: 400px;
  vertical-align: middle;
  border-style: none;

  &:hover{
    z-index: 1;
    position:relative;
  }
`;

export const CardDetailsContainer = Styled.div`
  display: block;
  flex: 1 1 auto;
  padding: 1.25rem;
`;

export const CardTitle = Styled.h4`
    color: #aaa;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const CardContent = Styled.p`
  color: #7a8288;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nonwrap;
  margin-bottom: 0.5rem;
  margin-top: 0.75rem;
`;
