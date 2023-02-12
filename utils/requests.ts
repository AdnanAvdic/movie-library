const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const requests = {
  fetchTopRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
};

export default requests;
