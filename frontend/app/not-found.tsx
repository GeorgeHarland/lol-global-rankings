import Link from 'next/link';

const PageNotFound = () => {
  return (
    <div>
      Page not found.
      <Link href="/" className="text-blue-700 hover:underline hover:font-bold">
        Click to go back to homepage
      </Link>
    </div>
  );
};

export default PageNotFound;
