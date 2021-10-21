import React from "react";
import Cards from "../components/Cards";
import TabContent from "../components/tabcontent/Index";
import { Link } from "react-router-dom";
import "./homepage.css";

const Home = () => {
  const [listAnime, setListAnime] = React.useState([{}]);
  const [searchName, setSearchName] = React.useState("");

  const TopWatch = async () => {
    const result = await fetch("https://api.jikan.moe/v3/top/anime/1");

    const topWatchResult = await result.json();

    setListAnime(topWatchResult.top);
  };

  React.useEffect(() => {
    TopWatch();
  }, []);

  return (
    <>
      <div style={{ backgroundColor: "#2d3238" }}>
        <TabContent />
      </div>

      <div className="search_mobile_container">
        <input
          onChange={(event) => {
            setSearchName(event.target.value);
          }}
          placeholder="Can't Find Your Anime?"
          className="search_mobile"
        />
        <Link
          to={{
            pathname: "/search",
            state: { animeName: searchName },
          }}
          className="search_mobile_btn"
        >
          SEARCH
        </Link>
      </div>

      <div className="main_phone_container">
        <div className="display_phone_container">
          {listAnime.map((element, index) => {
            return (
              <Cards
                key={index}
                ID={element.mal_id}
                animeTitle={element.title}
                imageSource={element.image_url}
                scoreRating={element.score}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
