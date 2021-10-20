import "../style/anime-details.css";
import "bootstrap/dist/css/bootstrap.min.css";
import InfiniteScroll from "react-infinite-scroll-component";
import React from "react";
import JikanApi from "../services/jikan-api";

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
      <button className="button button_watch_state update">Update</button>
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
          <button className="button button_watch_state completed">
            Completed
          </button>

          <button className="button button_watch_state plan_to_watch">
            Plan to Watch
          </button>

          <button className="button button_watch_state watching">
            Watching
          </button>

          <button className="button button_watch_state onhold">onhold</button>
        </div>
      </div>
    </div>
  );

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
              <button className="like_button col-4 btn-dark2 " onClick="">
                <div className="rating_count text-muted">0</div>
                <span className="rating_text">LIKE</span>
              </button>
              <button className="neutral_button col-4 btn-dark2 " onClick="">
                <div className="rating_count text-muted">0</div>
                <span className="rating_text">MEH</span>
              </button>
              <button className="dislike_button col-4 btn-dark2 " onClick="">
                <div className="rating_count text-muted">0</div>
                <span className="rating_text">DISLIKE</span>
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <h1 className="anime_title">{animeData.animeTitle}</h1>
          <div className="row">
            <div className="col-md-7">
              <div className="anime_summary_box">
                <div className="anime_summary_title">Summary</div>
                <div className="anime_summary">{animeData.animmeSummary}</div>
              </div>
            </div>
            <div className="col">
              <div className="d-flex justify-content-center align-middle">
                Percentage place holder
              </div>
            </div>
          </div>
          <div className="row">
            <div className="anime_title">Episode List</div>
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
                    Episode {data.episode_id} - {data.title}
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
