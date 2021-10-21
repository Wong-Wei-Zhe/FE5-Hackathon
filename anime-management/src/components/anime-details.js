import "../style/anime-details.css";
import "bootstrap/dist/css/bootstrap.min.css";
import InfiniteScroll from "react-infinite-scroll-component";
import React from "react";
import JikanApi from "../services/jikan-api";
import { FcLike } from "react-icons/fc";
import { AiTwotoneDislike } from "react-icons/ai";

function AnimeDetails() {
  let malId = 21;

  /*
  State to monitor episode list for lazy loading
  */
  const [animeEpisodes, setEpisodes] = React.useState({
    episodesList: [],
    episodesLastPage: 0,
    currentPage: 1,
    hasMore: true,
  });

  const [animeData, setAnimeData] = React.useState({
    animeTitle: "",
    animmeSummary: "",
    animePosterImg: "",
    airingStatus: "",
    airingTextStatus: "",
    animeEpisodes: "",
  });

  const [inputEpisode, setInputEpisode] = React.useState("");
  const inputEpisode_ref = React.useRef();

  /*
  Initial episode list retrieval
  */
  React.useEffect(() => {
    JikanApi.GetAnimeDetails(malId).then((data) => {
      //console.log(data.episodes);
      setAnimeData({
        animeTitle: data.animeTitle,
        animmeSummary: data.animmeSummary,
        animePosterImg: data.animePosterImg,
        airingStatus: data.airingStatus,
        airingTextStatus: data.airingTextStatus,
        animeEpisodes: data.animeEpisodes,
      });
    });

    JikanApi.GetAnimeEpisodes(malId).then((data) => {
      //console.log(data.episodes);
      setEpisodes({
        ...animeEpisodes,
        episodesList: [...data.episodes],
        episodesLastPage: data.episodesLastPage,
      });
    });
  }, []);

  React.useEffect(() => {
    console.log(animeData);
  }, [animeData]);

  /*
  Get the next page of episode list from API.
  */
  let fetchMoreEpisodes = () => {
    if (animeEpisodes.currentPage >= animeEpisodes.episodesLastPage) {
      setEpisodes({
        ...animeEpisodes,
        hasMore: false,
      });
      return;
    }

    let nextPage = animeEpisodes.currentPage + 1;

    JikanApi.GetAnimeEpisodes(malId, nextPage).then((data) => {
      setEpisodes({
        ...animeEpisodes,
        episodesList: [...animeEpisodes.episodesList, ...data.episodes],
        currentPage: nextPage,
      });
    });
  };

  let inWatchList = (
    <div className="watching_entry_box">
      <div>Currently in: </div>
      <div className="episode_input_box">
        <input
          className="episode_input"
          onChange={(event) => {
            setInputEpisode(event.target.value);
          }}
          value={inputEpisode}
          ref={inputEpisode_ref}
        ></input>
        <div className="episode_input_total">/25</div>
      </div>
      <button className="button button_watch_state update" id="button-1">
        <div id="circle1"></div>
        <div className="text-color1">Update</div>
      </button>
    </div>
  );

  let watchlistStatus = (
    <div className="watchlist_state_box">
      <span className="watchlist_status_header">
        <span>Watch List</span>
      </span>
      {inWatchList}
      <div className="entry_status_box">
        <div className="watch_status_group">
          <button className="button button_watch_state completed" id="button-1">
            <div id="circle2"></div>
            <div className="text-color1">Complete</div>
          </button>

          <button
            className="button button_watch_state plan_to_watch"
            id="button-1"
          >
            <div id="circle3"></div>
            <div className="text-color1">Plan to Watch</div>
          </button>

          <button className="button button_watch_state watching" id="button-1">
            <div id="circle4"></div>
            <div className="text-color1">Watching</div>
          </button>

          <button className="button button_watch_state onhold" id="button-1">
            <div id="circle5"></div>
            <div className="text-color1">onhold</div>
          </button>
        </div>
      </div>
    </div>
  );

  const toggle = true;

  //Counter for Like and Dislike button
  const [counter, setCounter] = React.useState(0);
  const handleClick = () => {
    setCounter(counter + 1);
  };

  const [count, setCount] = React.useState(0);
  const handleClick1 = () => {
    setCount(count + 1);
  };

  return (
    <div className="anime_details_container">
      <div className="row">
        <div className="col-md-4">
          <div className="left_content">
            <div className="card shadow mb-3 rounded">
              <img
                className="card-img-top"
                src={animeData.animePosterImg}
                alt="Error! Missing Image"
              ></img>
            </div>
            {watchlistStatus}
            <div className="rate_box btn-group btn-block text-center shadow-sm rounded">
              <button
                className="like_button col-4 btn-dark2 "
                onClick={handleClick}
              >
                {counter}
                <div className="size">
                  <FcLike />
                </div>
                <span className="rating_text">LIKE</span>
              </button>

              <button
                className="dislike_button col-4 btn-dark2 "
                onClick={handleClick1}
              >
                {count}
                <div className="size">
                  <AiTwotoneDislike />
                </div>
                <span className="rating_text">DISLIKE</span>
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <h1 className={`anime_title ${toggle && "heart-active"}`}>
            {animeData.animeTitle}
          </h1>
          <div className="row">
            <div className="col-md-7">
              <div className="anime_summary_box">
                <div className="anime_summary_title">Summary</div>
                <div className="anime_summary">{animeData.animmeSummary}</div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className={`anime_title ${toggle && "heart-active"}`}>
              Episode List
            </div>
            <div id="episode_list_box">
              <InfiniteScroll
                dataLength={animeEpisodes.episodesList.length}
                next={fetchMoreEpisodes}
                hasMore={animeEpisodes.hasMore}
                loader={<h4>Loading...</h4>}
                scrollableTarget="episode_list_box"
              >
                {animeEpisodes.episodesList.map((data, index) => (
                  <div className="episode" key={index}>
                    <li style={{ color: "black" }}>
                      <div style={{ fontWeight: "bold" }}>
                        Episode {data.episode_id}{" "}
                      </div>
                      {data.title}
                    </li>
                  </div>
                ))}
              </InfiniteScroll>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnimeDetails;
