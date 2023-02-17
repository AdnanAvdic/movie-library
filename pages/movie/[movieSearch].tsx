import Header from "../../components/Header";
import Head from "next/head";
import { GetServerSideProps } from "next";

interface PageName {
  params?: {
    movieSearch: string;
  };
}

type SearchResult = {
  id: number;
  title: string;
  release_date: string;
  overview: string;
};

type Props = {
  data: SearchResult[];
};

const MovieSearch = ({ data }: Props) => {
  return (
    <section>
      <Head>
        <title>Movie Library</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      {data.map((movie) => (
        <div key={movie.id}>
          <h1>{movie.title}</h1>
        </div>
      ))}
    </section>
  );
};

export default MovieSearch;

export const getServerSideProps = async ({ params }: PageName) => {
  console.log(params);
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1&include_adult=false&query=${params?.movieSearch}`
  );
  const data = await res.json();

  return { props: { data: data.results } };
};
