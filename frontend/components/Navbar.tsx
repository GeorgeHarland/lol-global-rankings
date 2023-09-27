import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="flex justify-around border-b border-gray-400 mb-4 pb-4">
      <Link href="/">
        <p className="text-2xl font-bold hover:text-gray-400">
          Global Leaderboard
        </p>
      </Link>
      <Link href="/worlds">
        <p className="text-2xl font-bold hover:text-gray-400">Worlds 2023</p>
      </Link>
      <Link href="/teams">
        <p className="text-2xl font-bold hover:text-gray-400">Teams</p>
      </Link>
      <Link href="/compare">
        <p className="text-2xl font-bold hover:text-gray-400">Compare Teams</p>
      </Link>
      <Link href="/about">
        <p className="text-2xl font-bold hover:text-gray-400">About</p>
      </Link>
    </nav>
  );
};

export default Navbar;
