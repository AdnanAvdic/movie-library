import Header from "../../components/Header";
import { Genre, Movie } from "../../typings";
import Image from "next/image";
import { baseUrl } from "../../constants/movieImage";
import Head from "next/head";
import { useState } from "react";

interface PageId {
  params: {
    id: string;
  };
}

interface Props {
  data: Movie;
}

const Movie = ({ data }: Props) => {
  const [isFavorite, setIsFavorite] = useState(false);

  //Pushing favorite movie to localStorage
  const handleFavorite = () => {
    setIsFavorite(!isFavorite);

    const favoritesString = localStorage.getItem("favoriteMovies");
    const favorites = favoritesString ? JSON.parse(favoritesString) : [];

    const index = favorites.findIndex((item: any) => item.title === data.title);

    if (isFavorite) {
      favorites.splice(index, 1);
    } else {
      favorites.push(data);
    }
    localStorage.setItem("favoriteMovies", JSON.stringify(favorites));
  };

  //Getting genres from data object
  const genre: Genre[] = data.genres;
  const genreNames: string[] = genre.map((genre: Genre) => genre.name);

  return (
    <section>
      <Head>
        <title>{data.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div
        className="flex flex-col justify-center mx-auto py-4
        max-w-[380px]
      sm:max-w-lg
      md:max-w-2x
      lg:max-w-3xl"
      >
        <div>
          <h1 className=" font-bold text-4xl py-4">{data.title}</h1>
          <div className=" relative w-[100%] h-[400px]">
            <Image
              src={`${baseUrl}${data.backdrop_path || data.poster_path}`}
              alt={data.title}
              fill
              className="object-cover rounded-md"
            />
          </div>
        </div>

        <div className=" py-4 text-sm">
          <p className="">{data.overview}</p>
          <p className="pt-4">Genre: {genreNames.join(", ")} </p>
        </div>

        <div className=" text-xs flex justify-between items-center py-6 font-semibold">
          <span>Watched {data.popularity} times</span>
          <span>Release date: {data.release_date}</span>
        </div>
      </div>

      <div className=" text-center text-2xl font-bold">
        <button onClick={handleFavorite}>
          {!isFavorite ? "Favorite" : "Unfavorite"}
        </button>
      </div>
    </section>
  );
};

export default Movie;

export const getServerSideProps = async ({ params: { id } }: PageId) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
  );
  const data = await res.json();

  return { props: { data } };
};
