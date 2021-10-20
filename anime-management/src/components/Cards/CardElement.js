import Styled from "styled-components";

export const CardContainerElements = Styled.div`
    display: block;
    margin-left: 10px;
    margin-right: 10px;
    cursor: pointer;
    @media screen and (max-width: 1200px){
        -webkit-box-flex: 0;
        flex: 0 0 25%;
        max-width: 25%
    }
    @media screen and (max-width: 768px){
        -webkit-box-flex: 0;
        flex: 0 0 33.3333333333%;
        max-width: 33.3333333333%;
    }
    @media screen and (max-width: 540px){
        -webkit-box-flex: 0;
        flex: 0 0 50%;
        max-width: 50%;
    }
    @media screen and (max-width: 500px){
        -webkit-box-flex: 0;
        flex: 0 0 80%;
        max-width: 80%;
    }
`;

export const CardContainer = Styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 500px;
  word-wrap: break-word;
  background-color: #32383e;
  border: 0 solid rgba(0, 0, 0, 0.6);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
  margin-bottom: 1.5rem;
  transition: all 0.2s ease-in-out;

  &:hover{
      transform: scale(1.03);
      background-color: #484f57;
    z-index: 1;
    position:relative;
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
