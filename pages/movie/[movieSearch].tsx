import Header from "../../components/Header";
import Head from "next/head";
import Image from "next/image";
import { baseUrl } from "../../constants/movieImage";

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
  backdrop_path: string;
  poster_path: string;
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

      <div
        className="flex flex-col justify-center mx-auto py-4
        max-w-[380px]
      sm:max-w-lg
      md:max-w-2x
      lg:max-w-3xl"
      >
        {data.map((movie) => (
          <div key={movie.id} className="mb-6">
            <div className=" relative w-[100%] h-[400px]">
              <Image
                src={`${baseUrl}${movie.backdrop_path || movie.poster_path}`}
                alt={movie.title}
                fill
                className="object-cover rounded-md"
              />
            </div>

            <div className="py-2 space-y-2">
              <h1 className=" text-3xl font-bold text-center">{movie.title}</h1>
              <p className="font-semibold">{movie.overview}</p>
            </div>

            <hr />
          </div>
        ))}
      </div>
    </section>
  );
};

export default MovieSearch;

export const getServerSideProps = async ({ params }: PageName) => {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${params?.movieSearch}`
  );
  const data = await res.json();

  return { props: { data: data.results } };
};
