import React, { useState } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

//Top 3 Carousel
const ContentSlider = () => {
  //Current Anime Shown
  const [current, setCurrent] = useState(0);

  //Top 3 Anime
  const [famous, setFamous] = useState([]);

  //The length of top array
  const length = famous.length;

  //Retrieving top 3 Anime from API
  React.useEffect(() => {
    fetch("https://api.jikan.moe/v3/top/anime")
      .then((result) => result.json())
      .then((topWatchResult) => {
        setFamous(topWatchResult.top.splice(0, 3));
      });
    return () => {};
  }, []);

  //Timer to show each Anime on the list
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(current === famous.length - 1 ? 0 : current + 1);
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  });

  //Changing current Anime shown to the next one
  const NextAnime = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  //Changing current Anime shown to the previous one
  const PrevAnime = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  //If array is empty show none
  if (!Array.isArray(famous) || famous.length <= 0) {
    return null;
  }

  return (
    <section className="famous_slider">
      {/* The arrow UI buttons */}
      <FaArrowAltCircleLeft className="left_arrow" onClick={PrevAnime} />
      <FaArrowAltCircleRight className="right_arrow" onClick={NextAnime} />

      {/* Mapping the top 3 Anime to the UI/Carousel */}
      {famous.map((slide, index) => {
        return (
          <div
            className={index === current ? "slide active" : "slide"}
            keys={index}
          >
            {index === current && (
              <div className="famous_background">
                {/* Background Image */}
                <img
                  src={slide.image_url}
                  alt=""
                  className="famous_anime_background_img"
                />

                {/* Anime Tile Image */}
                <img
                  src={slide.image_url}
                  alt="anime"
                  className="famous_anime_image"
                />

                {/* Text Card */}
                <div className="famous_text_tile">
                  {/* Anime Title */}
                  <div className="famous_anime_title">
                    <h1>{slide.title}</h1>
                  </div>

                  {/* Divider */}
                  <hr className="famous_divider"></hr>

                  {/* Rating Score */}
                  <div className="famous_anime_score">
                    <h2>Rating Score: {slide.score}/10</h2>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
};

export default ContentSlider;
