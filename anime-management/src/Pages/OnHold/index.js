import React from "react";
import Layout from "../../components/Layout";

const OnHold = () => {
  return (
    <Layout>
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
          There's nothing holding you here :P
        </span>
      </div>
    </Layout>
  );
};

export default OnHold;
