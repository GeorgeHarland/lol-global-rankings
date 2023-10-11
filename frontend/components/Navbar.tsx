import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="grid grid-flow-col gap-4 auto-cols-max justify-center items-center border-b border-gray-400 mb-4 pb-4">
      <Link href="/">
        <p className="transition-transform transform-gpu hover:scale-105 hover:opacity-80 text-2xl font-semibold font-sans tracking-wide hover:text-gray-400">
          Global Leaderboard
        </p>
      </Link>
      <Link href="/worlds">
        <p className="transition-transform transform-gpu hover:scale-105 hover:opacity-80 text-2xl font-semibold font-sans tracking-wide hover:text-gray-400">
          Worlds 2023
        </p>
      </Link>
      <Link href="/teams">
        <p className="transition-transform transform-gpu hover:scale-105 hover:opacity-80 text-2xl font-semibold font-sans tracking-wide hover:text-gray-400">
          Teams
        </p>
      </Link>
      <Link href="/compare">
        <p className="transition-transform transform-gpu hover:scale-105 hover:opacity-80 text-2xl font-semibold font-sans tracking-wide hover:text-gray-400">
          Compare Teams
        </p>
      </Link>
      <Link href="/about">
        <p className="transition-transform transform-gpu hover:scale-105 hover:opacity-80 text-2xl font-semibold font-sans tracking-wide hover:text-gray-400">
          About
        </p>
      </Link>
    </nav>
  );
};

export default Navbar;
