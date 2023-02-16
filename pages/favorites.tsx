import { useEffect, useState } from "react";
import FavoriteMovies from "../components/FavoriteMovies";
import Header from "../components/Header";
import { baseUrl } from "../constants/movieImage";

interface FavoriteMovie {
  id: number;
  title: string;
  backdrop_path: string;
  poster_path: string;
}

const Favorites = () => {
  const [favoritesString, setFavoritesString] = useState(null);

  useEffect(
    () =>
      setFavoritesString(JSON.parse(localStorage.getItem("favoriteMovies")!)),
    []
  );
  let favorites: FavoriteMovie[] = [];
  if (favoritesString != null) favorites = favoritesString;

  //function removes a movie from favorites list
  const removeFavoriteMovie = (item: FavoriteMovie) => {
    const updatedFavoriteMovies = [...favorites].filter(
      (movie) => movie.id !== item.id
    );
    const parseFavoriteMovies = JSON.stringify(updatedFavoriteMovies);

    setFavoritesString(JSON.parse(parseFavoriteMovies));

    localStorage.setItem(
      "favoriteMovies",
      JSON.stringify(updatedFavoriteMovies)
    );
  };

  return (
    <section>
      <Header />

      {favorites && (
        <div
          className=" mx-auto py-4
          max-w-[380px]
          sm:max-w-lg
          md:max-w-2x
          lg:max-w-3xl"
        >
          {favorites.length === 0 ? (
            <h1 className=" text-center font-bold text-3xl">
              No favorite movies
            </h1>
          ) : (
            <div>
              {favorites.map((item) => (
                <FavoriteMovies
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  imgBackdrop={`${baseUrl}${
                    item.backdrop_path || item.poster_path
                  }`}
                  onRemove={() => removeFavoriteMovie(item)!}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default Favorites;
