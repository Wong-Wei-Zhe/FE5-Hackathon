import React from "react";
import Layout from "../../components/Layout";

const Completed = () => {
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
          You have not completed any series yet!
        </span>
      </div>
    </Layout>
  );
};

export default Completed;
