import React from "react";

const Completed = () => {
  return (
    <div
      style={{
        backgroundColor: "#2d3238",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        height: "100vh",
      }}
    >
      <span
        style={{
          color: "white",
        }}
      >
        You have not completed any series yet!
      </span>
    </div>
  );
};

export default Completed;
