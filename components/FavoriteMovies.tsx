import Image from "next/image";

interface Props {
  id: number;
  title: string;
  imgBackdrop: string;
  onRemove: () => (item: { id: number }) => void;
}

const FavoriteMovies = (props: Props) => {
  const handleRemove = () => {
    if (props.onRemove) {
      props.onRemove();
    }
  };

  return (
    <div className="rounded-2xl mb-5 p-3 grid grid-cols-2 border-[2px] border-blue-600 border-solid">
      <div>
        <div className="relative w-[150px] sm:w-[200px] md:w-[200px] lg:w-[300px]  h-[200px] lg:h-[300px] ">
          <Image
            src={props.imgBackdrop}
            alt={props.title}
            fill
            className=" object-cover rounded-md"
            sizes="720"
          />
        </div>
      </div>

      <div className=" font-semibold grid-cols-1 grid text-center">
        <div className="flex flex-col justify-between ">
          <div>
            <h2 className="font-bold lg:text-4xl">{props.title}</h2>
          </div>
          <div>
            <button
              className="bg-blue-500 text-center text-white cursor-pointer
      flex py-3 px-3 rounded-md items-center"
              onClick={handleRemove}
            >
              Remove from favorites
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoriteMovies;
