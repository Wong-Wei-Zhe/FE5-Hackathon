//API function call
/*
Eample Use Case
useEffect(() => {
    JikanApi.SearchAnime("Anime_Name").then((data) => {
      setAnimeData(data);
    });
  }, []);
*/

const BASE_API = "https://api.jikan.moe/v3/";

class JikanApiServices {
  ApiQuery(queryString) {
    let searchData = fetch(queryString).then((response) => response.json());
    return searchData;
  }

  SearchAnime(searchString, pageNum = 1) {
    return this.ApiQuery(
      `${BASE_API}search/anime?q=${searchString}&page=${pageNum}`
    ).then((data) => data.results);
  }

  GetTopAnime() {
    return this.ApiQuery(`${BASE_API}top/anime`).then((data) => {
      return data.top;
    });
  }

  GetAnimeDetails(mal_id) {
    return this.ApiQuery(`${BASE_API}anime/${mal_id}`).then((data) => {
      return {
        animeTitle: data.title,
        animmeSummary: data.synopsis,
        animePosterImg: data.image_url,
        airingStatus: data.airing,
        airingTextStatus: data.status,
        animeEpisodes: data.episodes,
        animeScore: data.score,
      };
    });
  }

  GetAnimeEpisodes(mal_id, pageNum = 1) {
    return this.ApiQuery(`${BASE_API}anime/${mal_id}/episodes/${pageNum}`).then(
      (data) => {
        return {
          episodes: data.episodes,
          episodesLastPage: data.episodes_last_page,
        };
      }
    );
  }
}

const JikanApi = new JikanApiServices();

export default JikanApi;
