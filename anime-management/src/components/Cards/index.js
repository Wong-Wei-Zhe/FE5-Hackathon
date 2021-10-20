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

const Cards = (props) => {
  return (
    <CardContainerElements>
      <CardContainer>
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
