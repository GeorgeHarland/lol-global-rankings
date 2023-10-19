import Link from 'next/link';

const Player = ({
  playerID,
  playerName,
  role,
}: {
  playerID: string;
  playerName: string;
  role: string;
}) => {
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  return (
    <Link href={`/players/${playerID}`}>
      <div className="flex border-1 rounded-md bg-orange-800 pl-4 pr-4 hover:bg-orange-700 justify-between">
        <h1>
          {role == 'none' ? 'Unknown' : capitalizeFirstLetter(role)}
        </h1>
        <h1>
          {playerName}
        </h1>
      </div>
    </Link>
  );
};

export default Player;
