import React from "react";
import Cards from "../components/Cards";

const Home = () => {
  const [listAnime, setListAnime] = React.useState([{}]);

  const TopWatch = async () => {
    const result = await fetch("https://api.jikan.moe/v3/top/anime/1");

    const topWatchResult = await result.json();

    setListAnime(topWatchResult.top);
  };

  React.useEffect(() => {
    TopWatch();
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#2d3238",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        className="display_container"
        style={{
          backgroundColor: "#2d3238",
          display: "flex",
          flexWrap: "wrap",
          height: "80vh",
          marginRight: "10px",
          marginLeft: "10px",
          justifyContent: "center",
        }}
      >
        {listAnime.map((element, index) => {
          return (
            <Cards
              key={index}
              animeTitle={element.title}
              imageSource={element.image_url}
              scoreRating={element.score}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
