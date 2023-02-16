export interface Movie {
  title: string;
  backdrop_path: string;
  media_type?: string;
  release_date?: any;
  first_air_date: string;
  genre_ids: number[];
  genre_names: string;
  genres: Genre[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

interface Genre {
  id: number;
  name: string;
}
