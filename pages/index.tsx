import Head from "next/head";
import { useState } from "react";
import Header from "../components/Header";
import Movies from "../components/Movies";
import { Genre, Movie } from "../typings";
import requests from "../utils/requests";

interface Props {
  topRated: Movie[];
}

const Home = ({ topRated }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const filteredTopRated = topRated
    .filter((movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (selectedOption === "name") {
        return a.title.localeCompare(b.title);
      } else if (selectedOption === "year") {
        return new Date(b.release_date) - new Date(a.release_date);
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
              placeholder="Search by name..."
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

          <div className=" py-4">
            <ul className=" flex flex-row space-x-12 overflow-auto pb-3">
              <li>Comedy</li>
              <li>Action</li>
              <li>Drama</li>
              <li>Horror</li>
              <li>Thriller</li>
              <li>Documentary</li>
            </ul>
          </div>

          {filteredTopRated.map((item) => (
            <Movies
              key={item.title}
              id={item.id}
              title={item.title}
              popularity={item.popularity}
              outDate={item.release_date}
              imgBackdrop={`${item?.backdrop_path || item?.poster_path}`}
            />
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const res = await fetch(requests.fetchTopRated);
  const topRated = await res.json();

  return { props: { topRated: topRated.results } };
};
