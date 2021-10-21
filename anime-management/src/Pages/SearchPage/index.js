import React from "react";
import Cards from "../../components/Cards";

const SearchPage = (props) => {
  console.log(props.location.state.animeName);
  const searchAnimeName = props.location.state.animeName;
  const [listAnime, setListAnime] = React.useState([{}]);

  const SearchAnime = async () => {
    const result = await fetch(
      "https://api.jikan.moe/v3/search/anime?q=" + searchAnimeName
    );

    const topWatchResult = await result.json();

    setListAnime(topWatchResult.results);
  };

  React.useEffect(() => {
    SearchAnime();
  }, [searchAnimeName]);

  return (
    <>
      <div
        style={{
          backgroundColor: "#2d3238",
          display: "flex",
          justifyContent: "flex-start",
          paddingTop: "60px",
          paddingLeft: "80px",
          alignItems: "end",
          color: "white",
        }}
      >
        <h1>Searched: {searchAnimeName}</h1>
      </div>

      <div
        style={{
          backgroundColor: "#2d3238",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div
          style={{
            backgroundColor: "#2d3238",
            display: "flex",
            flexWrap: "wrap",
            height: "80vh",
            marginRight: "10px",
            marginLeft: "10px",
            justifyContent: "center",
          }}
        >
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

export default SearchPage;
