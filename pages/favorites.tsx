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
  const favoritesString = localStorage.getItem("favoriteMovies");
  const favorites: FavoriteMovie[] = favoritesString
    ? JSON.parse(favoritesString)
    : [];

  const removeFavorite = (index: number) => {
    favorites.splice(index, 1);
    localStorage.setItem("favoriteMovies", JSON.stringify(favorites));
  };

  const removeAllFavorites = () => {
    localStorage.clear();
  };

  return (
    <section>
      <Header />

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
            {favorites.map((item, index) => (
              <FavoriteMovies
                key={item.id}
                title={item.title}
                imgBackdrop={`${baseUrl}${
                  item.backdrop_path || item.poster_path
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="text-center py-6">
        <button
          onClick={removeAllFavorites}
          className=" text-center bg-red-500 py-3 px-3 rounded-md text-white "
        >
          Remove all
        </button>
      </div>
    </section>
  );
};

export default Favorites;
