import React from "react";
import Layout from "../../components/Layout";

const OnGoing = () => {
  return (
    <Layout>
      <div
        style={{
          backgroundColor: "#2d3238",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          height: "100vh",
        }}
      >
        <span
          className="mobile_type_text"
          style={{
            color: "white",
          }}
        >
          Please select an ANIME series to have this section filled!
        </span>
      </div>
    </Layout>
  );
};

export default OnGoing;
