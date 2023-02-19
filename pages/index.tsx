import Head from "next/head";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Movies from "../components/Movies";
import { Movie } from "../typings";

interface Props {
  topRated: Movie[];
}

const Home = ({ topRated }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [allMovies, setAllMovies] = useState(topRated);

  //fetching more movies on when scrolling

  useEffect(() => {
    window.onscroll = async () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        const nextPage = currentPage + 1;
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=${nextPage}`
        );
        const data = await res.json();
        setAllMovies([...allMovies, ...data.results]);
        setCurrentPage(nextPage);
      }
    };
  });

  //formatting genre id's to genre names from hashmap
  for (let i = 0; i < allMovies.length; i++) {
    let genreNames = getGenresFromIds(allMovies[i].genre_ids);
    allMovies[i].genre_names = genreNames;
  }

  //filtering movies
  let filteredTopRated = allMovies
    .filter(
      (movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.genre_names.toLowerCase().includes(searchQuery.toLowerCase()) ||
        new Date(movie.release_date)
          .getFullYear()
          .toString()
          .includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (selectedOption === "name") {
        return a.title.localeCompare(b.title);
      } else if (selectedOption === "year") {
        const aDate = new Date(a.release_date);
        const bDate = new Date(b.release_date);
        return bDate.getTime() - aDate.getTime();
      } else {
        return 0;
      }
    });

  return (
    <>
      <Head>
        <title>Movie Library</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="py-4">
        <div
          className="mx-auto
          max-w-[380px]
          sm:max-w-lg
          md:max-w-2x
          lg:max-w-3xl "
        >
          <div className=" flex items-center space-x-3">
            <input
              className="border-[2px] border-blue-600 border-solid rounded-full p-3 w-[80%] my-4"
              placeholder="Search by name, year or genre..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />

            <select
              value={selectedOption}
              onChange={(event) => setSelectedOption(event.target.value)}
            >
              <option value="default">Default</option>
              <option value="name">Name</option>
              <option value="year">Year</option>
            </select>
          </div>

          {filteredTopRated.map((item) => {
            return (
              <Movies
                key={item.title}
                id={item.id}
                title={item.title}
                popularity={item.popularity}
                outDate={item.release_date}
                imgBackdrop={`${item?.backdrop_path || item?.poster_path}`}
                genreIds={item.genre_ids}
                genreNames={item.genre_names}
              />
            );
          })}
        </div>
      </main>
    </>
  );
};

export default Home;

let hashMap = new Map<number, string>();
hashMap.set(28, "Action");
hashMap.set(12, "Adventure");
hashMap.set(16, "Animation");
hashMap.set(35, "Comedy");
hashMap.set(80, "Crime");
hashMap.set(99, "Documentary");
hashMap.set(18, "Drama");
hashMap.set(10751, "Family");
hashMap.set(14, "Fantasy");
hashMap.set(36, "History");
hashMap.set(27, "Horor");
hashMap.set(10402, "Music");
hashMap.set(9648, "Mystery");
hashMap.set(878, "Science Fiction");
hashMap.set(10770, "TV Movie");
hashMap.set(53, "Thriller");
hashMap.set(10752, "War");
hashMap.set(37, "Western");

const getGenresFromIds = (array: number[]) => {
  let genre: string[] = [];
  for (let i = 0; i < array.length; i++) {
    let genreName = hashMap.get(array[i]);
    genre.push(genreName!);
  }

  return genre.join(", ");
};

export const getServerSideProps = async (query: any) => {
  const pageParam = query.pageParam || 1;
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=${pageParam}`
  );

  const topRated = await res.json();
  return { props: { topRated: topRated.results } };
};
