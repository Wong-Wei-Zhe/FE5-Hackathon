import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/effect-coverflow/effect-coverflow.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import "./AnimeCarousel.css";
import SwiperCore, {
  EffectCoverflow,
  Pagination,
  Navigation,
} from "swiper/core";
import React, { useState } from "react";

SwiperCore.use([EffectCoverflow, Pagination, Navigation]);

export default function AnimeCarousel() {
  //Top 5 Anime
  const [famous, setFamous] = useState([]);

  //Retrieving top 5 Anime from API
  React.useEffect(() => {
    fetch("https://api.jikan.moe/v3/top/anime")
      .then((result) => result.json())
      .then((topWatchResult) => {
        setFamous(topWatchResult.top.splice(0, 5));
      });
    return () => {};
  }, []);

  //If array is empty, show none
  if (!Array.isArray(famous) || famous.length <= 0) {
    return null;
  }

  return (
    <div className="container">
      <div className="title_wrapper">
        <div className="section_title">
          <span>Top 5 Anime of All Time</span>
        </div>
      </div>
      {/* Carousel characteristics */}
      <Swiper
        navigation={true}
        effect={"coverflow"}
        centeredSlides={true}
        slidesPerView={window.innerWidth < 768 ? 1 : "auto"}
        loop={true}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{
          clickable: true,
        }}
      >
        <SwiperSlide>
          {/* A top 5 anime entry tile */}

          <div className="famous_text_tile">
            {/* Anime image URL */}
            <img className="famous_anime_image" src={famous[0].image_url} />

            {/* Anime Title */}
            <div className="famous_anime_title">
              <h1>{famous[0].title}</h1>
            </div>
            {/* Rating Score */}
            <div className="famous_anime_score">
              <h2>Rating Score: {famous[0].score}/10</h2>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {/* A top 5 anime entry tile */}
          <div className="famous_text_tile">
            {/* Anime image URL */}
            <img className="famous_anime_image" src={famous[1].image_url} />
            {/* Anime Title */}
            <div className="famous_anime_title">
              <h1>{famous[1].title}</h1>
            </div>

            {/* Rating Score */}
            <div className="famous_anime_score">
              <h2>Rating Score: {famous[1].score}/10</h2>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {/* A top 5 anime entry tile */}
          <div className="famous_text_tile">
            {/* Anime image URL */}
            <img className="famous_anime_image" src={famous[2].image_url} />
            {/* Anime Title */}
            <div className="famous_anime_title">
              <h1>{famous[2].title}</h1>
            </div>

            {/* Rating Score */}
            <div className="famous_anime_score">
              <h2>Rating Score: {famous[2].score}/10</h2>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {/* A top 5 anime entry tile */}
          <div className="famous_text_tile">
            {/* Anime image URL */}
            <img className="famous_anime_image" src={famous[3].image_url} />
            {/* Anime Title */}
            <div className="famous_anime_title">
              <h1>{famous[3].title}</h1>
            </div>

            {/* Rating Score */}
            <div className="famous_anime_score">
              <h2>Rating Score: {famous[3].score}/10</h2>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {/* A top 5 anime entry tile */}
          <div className="famous_text_tile">
            {/* Anime image URL */}
            <img className="famous_anime_image" src={famous[4].image_url} />
            {/* Anime Title */}
            <div className="famous_anime_title">
              <h1>{famous[4].title}</h1>
            </div>

            {/* Rating Score */}
            <div className="famous_anime_score">
              <h2>Rating Score: {famous[4].score}/10</h2>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
