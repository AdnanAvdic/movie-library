import Header from "../../components/Header";
import { Movie } from "../../typings";
import Image from "next/image";
import { baseUrl } from "../../constants/movieImage";

interface PageId {
  params: {
    id: string;
  };
}

interface Props {
  data: Movie;
}

const Movie = ({ data }: Props) => {
  return (
    <section>
      <Header />

      <div
        className="flex flex-col justify-center mx-auto py-4
        max-w-[400px]
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
        </div>

        <div className=" text-xs flex justify-between items-center py-6 font-semibold">
          <span>Watched {data.popularity} times</span>
          <span>Release date: {data.release_date}</span>
        </div>
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
