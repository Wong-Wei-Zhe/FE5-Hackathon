import React from "react";
import Cards from "../Cards";
import "./homepage.css";
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
import { db } from "../../App";
import { getAuth } from "firebase/auth";
import { async } from "@firebase/util";

const WatchListWatching = () => {
  const authentication = getAuth();
  let user = authentication.currentUser;
  const [listWatchList, setListWatchList] = React.useState([]);

  React.useEffect(() => {
    GetWatchList();
  }, []);

  const GetWatchList = async () => {
    //console.log(user.uid);
    const queryResult = await query(
      collection(db, "Users", user.uid, "Anime"),
      where("watch_status", "==", "Watching")
    );

    let queryList = [];
    await getDocs(queryResult).then((querySnapshot) =>
      querySnapshot.forEach((docu) => {
        let queryData = docu.data();
        //console.log(queryData);
        let structData = {
          malId: queryData.mal_id,
          animeTitle: queryData.anime_title,
          animeImg: queryData.anime_img,
          animeScore: queryData.animeScore,
        };

        console.log(structData);
        queryList.push(structData);
        //setListWatchList([...listWatchList, structData]);
      })
    );

    setListWatchList(queryList);
  };

  React.useEffect(() => {
    console.log("use effect check");
    console.log(listWatchList);
  }, [listWatchList]);

  const checkList = () => {
    if (listWatchList.length <= 0) {
      return <span style={{ color: "white" }}>Empty List</span>;
    } else {
      return (
        <>
          <div className="main_container">
            <div className="display_container">
              {listWatchList.map((element, index) => {
                return (
                  <Cards
                    key={index}
                    ID={element.malId}
                    animeTitle={element.animeTitle}
                    imageSource={element.animeImg}
                    scoreRating={element.animeScore}
                  />
                );
              })}
            </div>
          </div>
        </>
      );
    }
  };

  return <>{checkList()}</>;
};

export default WatchListWatching;
