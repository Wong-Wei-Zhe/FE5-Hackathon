import "../style/anime-details.css";
import "bootstrap/dist/css/bootstrap.min.css";
import InfiniteScroll from "react-infinite-scroll-component";
import React from "react";
import JikanApi from "../services/jikan-api";
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
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Layout from "./Layout";

function AnimeDetails(props) {
  let malId = props.location.state.id;
  const authentication = getAuth();
  const user = authentication.currentUser;
  const [watchStatus, setWatchStatus] = React.useState("");

  // onAuthStateChanged(authentication, (user) => {
  //   if (user) {
  //     user = user.uid;
  //   }
  // });

  const watchStatusSet = (option) => {
    switch (option) {
      case 1:
        setWatchStatus("Completed");
        console.log("complete");
        break;
      case 2:
        setWatchStatus("Plan to Watch");
        break;
      case 3:
        setWatchStatus("Watching");
        break;
      case 4:
        setWatchStatus("On Hold");
        break;
      default:
      // code block
    }

    if (!inWatchList) {
      console.log(inWatchList);
      addDoc(collection(db, "Users", user.uid, "Anime"), {
        mal_id: malId,
        watch_status: watchStatus,
        episodes: "0",
      });
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

  // React.useEffect(() => {
  //   checkInList();
  // }, [getAuth]);

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
          setWatchedEpisode(doc.episodes);
          setWatchStatusRecord(doc.watch_status);
          setInWatchList(true);
        }
      });
    });
    return () => unsub();
  }

  const updateEpisodeWatched = () => {
    const queryResult = query(
      collection(db, "Users", user.uid, "Anime"),
      where("mal_id", "==", malId)
    );

    getDocs(queryResult).then((querySnapshot) =>
      querySnapshot.forEach((docu) => {
        //console.log(docu.id);
        let docRef = doc(db, "Users", user.uid, "Anime", docu.id);
        updateDoc(docRef, {
          episodes: inputEpisode,
        });
      })
    );
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
      <div>Currently in: </div>
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
        onClick={updateEpisodeWatched}
      >
        Update
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
          <button
            className="button button_watch_state completed"
            onClick={(option_num = 1) => watchStatusSet(option_num)}
          >
            Completed
          </button>

          <button
            className="button button_watch_state plan_to_watch"
            onClick={""}
          >
            Plan to Watch
          </button>

          <button className="button button_watch_state watching" onClick={""}>
            Watching
          </button>

          <button className="button button_watch_state onhold" onClick={""}>
            onhold
          </button>
        </div>
      </div>
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
                <button className="like_button col-4 btn-dark2 " onClick={""}>
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
                  loader={<h4>{episodeVerify()}</h4>}
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
    </Layout>
  );
}

export default AnimeDetails;
