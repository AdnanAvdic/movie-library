import Link from "next/link";

const Header = () => {
  return (
    <header className="py-4 shadow-md">
      <div className="max-w-md mx-auto text-center font-bold text-2xl">
        <Link href="/">Movie Library</Link>
      </div>
    </header>
  );
};

export default Header;
