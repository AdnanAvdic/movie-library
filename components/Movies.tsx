import Link from "next/link";
import Image from "next/image";
import { baseUrl } from "../constants/movieImage";

interface Props {
  id: number;
  title: string;
  popularity: number;
  outDate: any;
  imgBackdrop: string;
}

const Movies = (props: Props) => {
  return (
    <div className="rounded-2xl mb-5 p-3 grid grid-cols-2 border-[2px] border-blue-600 border-solid ">
      <div>
        <div className="relative w-[200px] h-[200px]">
          <Image
            src={`${baseUrl}${props.imgBackdrop}`}
            alt={props.title}
            fill
            className=" object-cover rounded-md"
          />
        </div>
      </div>

      <div className="grid grid-rows-2 items-end relative pl-6 ">
        <div>
          <h2 className="font-bold">{props.title}</h2>
          <h3 className=" mt-3 text-sm">Watched {props.popularity} times</h3>
          <h3 className="text-sm ">Release date: {props.outDate}</h3>
        </div>

        <div className="cursor-pointer hover:scale-105 ease-in-out transition transform">
          <Link href={`/movies/${props.id}`}>
            <button className="py-2 px-8 bg-blue-500 text-white font-semibold rounded-md ">
              See more
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Movies;
