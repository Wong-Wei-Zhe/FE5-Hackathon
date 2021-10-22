import React from "react";
import {
  CardContainer,
  CardImage,
  CardDetailsContainer,
  CardTitle,
  CardContent,
  CardImageWrapper,
  CardContainerElements,
} from "./CardElement";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Cards = (props) => {
  const displayDetails = () => {
    console.log(props.ID);
  };
  return (
    <CardContainerElements>
      <CardContainer
        onClick={displayDetails}
        to={{
          pathname: "/details",
          state: { id: props.ID },
        }}
        malID={props.ID}
      >
        <CardImageWrapper>
          <CardImage src={props.imageSource} alt="No Image Displaying" />
        </CardImageWrapper>
        <CardDetailsContainer>
          <CardTitle>{props.animeTitle}</CardTitle>
          <CardContent>
            Ratings:{" "}
            <span style={{ color: "#00ff44", fontWeight: "bold" }}>
              {props.scoreRating}
            </span>
          </CardContent>
        </CardDetailsContainer>
      </CardContainer>
    </CardContainerElements>
  );
};

export default Cards;
