import Head from "next/head";
import { useState } from "react";
import Header from "../components/Header";
import Movies from "../components/Movies";
import { Genre, Movie } from "../typings";
import requests from "../utils/requests";

interface Props {
  topRated: Movie[];
}

interface PageProps {
  topRated: Genre[];
}

const Home = ({ topRated }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTopRated = topRated.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          max-w-md
          sm:max-w-lg
          md:max-w-2x
          lg:max-w-3xl "
        >
          <input
            className="border-[2px] border-blue-600 border-solid rounded-full p-3 w-full my-4"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />

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
