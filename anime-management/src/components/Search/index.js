import React from "react";
// import API from "../api";

function Search() {
  const [animeName, setAnimeName] = React.useState("");

  //   function getapi() {
  //     API("/top/anime/1").then((response) => {
  //       console.log(response);
  //     });
  //   }

  // getapi();

  const SearchAnime = async () => {
    const result = await fetch(
      "https://api.jikan.moe/v3/search/anime?q=" + animeName
    );

    const searchResult = await result.json();

    console.log(searchResult);
    console.log(searchResult.results[1].title);
  };

  const TopWatch = async () => {
    const result = await fetch("https://api.jikan.moe/v3/top/anime/1");

    const topWatchResult = await result.json();

    console.log(topWatchResult);
  };

  React.useEffect(() => {
    TopWatch();
  }, []);

  return (
    <>
      <div className="search_box">
        <input
          id="search_anime"
          placeholder="Search"
          onChange={(event) => {
            setAnimeName(event.target.value);
          }}
        ></input>
        <button onClick={SearchAnime}>find</button>
      </div>
    </>
  );
}

export default Search;
