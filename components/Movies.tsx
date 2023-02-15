import Link from "next/link";
import Image from "next/image";
import { baseUrl } from "../constants/movieImage";

interface MovieProps {
  id: number;
  title: string;
  popularity: number;
  outDate: string;
  imgBackdrop: string;
  genreIds: number[];
}

enum Genres {
  _28 = "Action",
  _12 = "Adventure",
  _16 = "Animation",
  _35 = "Comedy",
  _80 = "Crime",
  _99 = "Documentary",
  _18 = "Drama",
  _10751 = "Family",
  _14 = "Fantasy",
  _36 = "History",
  _27 = "Horror",
  _10402 = "Music",
  _9648 = "Mystery",
  _10749 = "Romance",
  _878 = "Science Fiction",
  _10770 = "TV Movie",
  _53 = "Thriller",
  _10752 = "War",
  _37 = "Western",
}

const Movies = (props: MovieProps) => {
  return (
    <div className="rounded-2xl mb-5 p-3 grid grid-cols-2 border-[2px] border-blue-600 border-solid ">
      <div>
        <div className="relative w-[150px] sm:w-[200px] md:w-[200px] lg:w-[300px]  h-[200px] lg:h-[300px] ">
          <Image
            src={`${baseUrl}${props.imgBackdrop}`}
            alt={props.title}
            fill
            className=" object-cover rounded-md"
            sizes="720"
          />
        </div>
      </div>

      <div className="flex flex-col justify-between ">
        <div>
          <h2 className="font-bold lg:text-4xl">{props.title}</h2>
          <h3 className=" mt-3 text-xs">Watched {props.popularity} times</h3>
          <h3 className="text-xs ">Release date: {props.outDate}</h3>
        </div>

        <div className="cursor-pointer hover:scale-105 ease-in-out transition transform mt-3">
          <Link href={`/movies/${props.id}`}>
            <button className="py-2 px-8 bg-blue-500 text-white font-semibold rounded-md w-[80%] ">
              See more
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Movies;
