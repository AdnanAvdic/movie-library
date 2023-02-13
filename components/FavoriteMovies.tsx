import Image from "next/image";

interface Props {
  title: string;
  imgBackdrop: string;
}

const FavoriteMovies = (props: Props) => {
  return (
    <div className=" grid-cols-2 grid mb-4">
      <div className="relative w-[150px] sm:w-[200px] md:w-[200px] lg:w-[300px]  h-[200px]">
        <Image
          src={props.imgBackdrop}
          alt={props.title}
          fill
          className=" object-cover rounded-md"
          sizes="720"
        />
      </div>

      <div className=" font-semibold grid-cols-1 grid text-center">
        <div>{props.title}</div>
        <div>
          <button
            className="bg-blue-500 text-center text-white cursor-pointer
        flex py-3 px-3 rounded-md items-center"
          >
            Remove from favorites
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavoriteMovies;
