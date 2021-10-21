import "../style/anime-details.css";
import "bootstrap/dist/css/bootstrap.min.css";
import InfiniteScroll from "react-infinite-scroll-component";
import React from "react";
import JikanApi from "../services/jikan-api";
import { FcLike } from "react-icons/fc";
import { AiTwotoneDislike } from "react-icons/ai";
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  where,
  getDocs,
  update,
  addDoc,
} from "firebase/firestore";
import { db } from "../App";
import { getAuth } from "firebase/auth";
import Layout from "./Layout";

function AnimeDetails(props) {
  let malId = props.location.state.id;
  console.log("anime detail in with ID" + malId);
  const authentication = getAuth();
  let user = authentication.currentUser;
  const [watchStatus, setWatchStatus] = React.useState("");

  // onAuthStateChanged(authentication, (userauth) => {
  //   if (userauth) {
  //     user = userauth.uid;
  //   }
  // });

  const watchStatusSet = (option) => {
    console.log("option" + option);
    let watchStatus = "";
    switch (option) {
      case 1:
        watchStatus = "Completed";
        console.log("complete");
        break;
      case 2:
        watchStatus = "Plan to Watch";
        break;
      case 3:
        watchStatus = "Watching";
        break;
      case 4:
        watchStatus = "On Hold";
        break;
      default:
      // code block
    }

    console.log("Check watch status set " + watchStatus);

    if (!inWatchList) {
      console.log(inWatchList);
      addDoc(collection(db, "Users", user.uid, "Anime"), {
        mal_id: malId,
        watch_status: watchStatus,
        episodes: "0",
        anime_title: animeData.animeTitle,
        anime_img: animeData.animePosterImg,
        animeScore: animeData.animeScore,
      });
      checkInList();
    } else {
      const queryResult = query(
        collection(db, "Users", user.uid, "Anime"),
        where("mal_id", "==", malId)
      );

      getDocs(queryResult).then((querySnapshot) =>
        querySnapshot.forEach((docu) => {
          //console.log(docu.id);
          let docRef = doc(db, "Users", user.uid, "Anime", docu.id);
          updateDoc(docRef, {
            watch_status: watchStatus,
          });
        })
      );
    }
  };

  // React.useEffect(() => {
  //   if (!inWatchList) {
  //     console.log(inWatchList);
  //     addDoc(collection(db, "Users", user.uid, "Anime"), {
  //       mal_id: malId,
  //       watch_status: watchStatus,
  //       episodes: "0",
  //     });
  //   } else {
  //     const queryResult = query(
  //       collection(db, "Users", user.uid, "Anime"),
  //       where("mal_id", "==", malId)
  //     );

  //     getDocs(queryResult).then((querySnapshot) =>
  //       querySnapshot.forEach((docu) => {
  //         //console.log(docu.id);
  //         let docRef = doc(db, "Users", user.uid, "Anime", docu.id);
  //         updateDoc(docRef, {
  //           watch_status: watchStatus,
  //         });
  //       })
  //     );
  //   }
  // }, [watchStatus]);

  React.useEffect(() => {
    checkInList();
  }, [getAuth]);

  function checkInList() {
    console.log(user.uid);
    const q = query(
      collection(db, "Users", user.uid, "Anime"),
      where("mal_id", "==", malId)
    );
    const unsub = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (!doc) {
          setInWatchList(false);
        } else {
          let queryData = doc.data();
          setWatchedEpisode(queryData.episodes);
          setWatchStatusRecord(queryData.watch_status);
          setInWatchList(true);
        }
      });
    });
    return () => unsub();
  }

  const updateEpisodeWatched = () => {
    console.log("Updating!");
    let alt_scenario = true;
    let alt_episode = 0;
    if (
      parseInt(inputEpisode) > parseInt(animeData.animeEpisodes) &&
      animeEpisodes != "-"
    ) {
      setInputEpisode(animeData.animeEpisodes);
      alt_episode = animeData.animeEpisodes;
    } else if (parseInt(inputEpisode) < 0) {
      setInputEpisode(0);
      alt_episode = 0;
    } else {
      alt_scenario = false;
    }

    const queryResult = query(
      collection(db, "Users", user.uid, "Anime"),
      where("mal_id", "==", malId)
    );

    getDocs(queryResult).then((querySnapshot) =>
      querySnapshot.forEach((docu) => {
        //console.log(docu.id);
        let docRef = doc(db, "Users", user.uid, "Anime", docu.id);
        if (!alt_scenario) {
          updateDoc(docRef, {
            episodes: inputEpisode,
          });
        } else {
          updateDoc(docRef, {
            episodes: alt_episode,
          });
        }
      })
    );
  };

  const removeFromList = () => {
    console.log("Removing!");
    const queryResult = query(
      collection(db, "Users", user.uid, "Anime"),
      where("mal_id", "==", malId)
    );

    getDocs(queryResult).then((querySnapshot) =>
      querySnapshot.forEach((docu) => {
        //console.log(docu.id);
        let docRef = doc(db, "Users", user.uid, "Anime", docu.id);
        deleteDoc(docRef);
      })
    );

    setInWatchList(false);
  };

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

  const [watchStatusRecord, setWatchStatusRecord] = React.useState(0);
  const [watchedEpisode, setWatchedEpisode] = React.useState(0);
  const [inWatchList, setInWatchList] = React.useState(false);
  const [inputEpisode, setInputEpisode] = React.useState("");
  const inputEpisode_ref = React.useRef();

  /*
  Initial episode list retrieval
  */
  React.useEffect(() => {
    JikanApi.GetAnimeDetails(malId).then((data) => {
      let episodesCount = data.animeEpisodes;
      if (episodesCount === null) {
        episodesCount = "-";
      }
      //console.log(data.episodes);
      setAnimeData({
        animeTitle: data.animeTitle,
        animmeSummary: data.animmeSummary,
        animePosterImg: data.animePosterImg,
        airingStatus: data.airingStatus,
        airingTextStatus: data.airingTextStatus,
        animeEpisodes: episodesCount,
        animeScore: data.animeScore,
      });
    });

    JikanApi.GetAnimeEpisodes(malId).then((data) => {
      //console.log(data.episodes);
      setEpisodes({
        ...animeEpisodes,
        episodesList: [...data.episodes],
        episodesLastPage: data.episodesLastPage,
      });

      // if (data.episodes.length <= 0) {
      //   setEpisodes({
      //     ...animeEpisodes,
      //     hasMore: false,
      //   });
      // }
    });
  }, []);

  // React.useEffect(() => {
  //   console.log(animeEpisodes);
  // }, [animeEpisodes]);

  /*
  Get the next page of episode list from API.
  */
  const fetchMoreEpisodes = () => {
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

  const episodeVerify = () => {
    if (animeEpisodes.episodesList.length <= 0) {
      return "No Episode Data Available";
    } else {
      return "Loading...";
    }
  };

  let inWatchListHTML = (
    <div className="watching_entry_box">
      <div>Currently in: {watchStatusRecord}</div>
      <div className="episode_input_box">
        <input
          className="episode_input"
          onChange={(event) => {
            setInputEpisode(event.target.value);
          }}
          placeholder={watchedEpisode}
          value={inputEpisode}
          ref={inputEpisode_ref}
        ></input>
        <div className="episode_input_total">/{animeData.animeEpisodes}</div>
      </div>
      <button
        className="button button_watch_state update"
        id="button-1"
        onClick={updateEpisodeWatched}
      >
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
      {inWatchList ? inWatchListHTML : <></>}
      <div className="entry_status_box">
        <div className="watch_status_group">
          <button className="button button_watch_state completed" id="button-1">
            <div id="circle2"></div>
            <div className="text-color1" onClick={() => watchStatusSet(1)}>
              Complete
            </div>
          </button>

          <button
            className="button button_watch_state plan_to_watch"
            id="button-1"
            onClick={() => watchStatusSet(2)}
          >
            <div id="circle3"></div>
            <div className="text-color1">Plan to Watch</div>
          </button>

          <button
            className="button button_watch_state watching"
            id="button-1"
            onClick={() => watchStatusSet(3)}
          >
            <div id="circle4"></div>
            <div className="text-color1">Watching</div>
          </button>

          <button
            className="button button_watch_state onhold"
            id="button-1"
            onClick={() => watchStatusSet(4)}
          >
            <div id="circle5"></div>
            <div className="text-color1">On Hold</div>
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

  let removeListButton = (
    <div className="remove_list_box">
      <button
        className="button button_watch_state remove"
        id="button-1"
        onClick={() => {
          removeFromList();
        }}
      >
        <div id="circle5"></div>
        <div className="text-color1">Remove From List</div>
      </button>
    </div>
  );

  return (
    <Layout>
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
              {inWatchList ? removeListButton : <></>}
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
                  loader={<h4>{episodeVerify()}</h4>}
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
    </Layout>
  );
}

export default AnimeDetails;
