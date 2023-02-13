import Link from "next/link";

const Header = () => {
  return (
    <header className="py-4 shadow-md">
      <div
        className="mx-auto text-center font-bold text-xl flex justify-between items-center
        max-w-[380px]
        sm:max-w-lg
        md:max-w-2x
        lg:max-w-3xl "
      >
        <Link href="/">Movie Library</Link>
        <Link href="/favorites">Favorites</Link>
      </div>
    </header>
  );
};

export default Header;
