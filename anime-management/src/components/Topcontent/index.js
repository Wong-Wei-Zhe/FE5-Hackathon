import React from "react";
import Cards from "../Cards";
import "./homepage.css";

const TopContent = () => {
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
    <>
      <div className="main_container">
        <div className="display_container">
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

export default TopContent;
