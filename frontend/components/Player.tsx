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
      {playerName} - {capitalizeFirstLetter(role)}
    </Link>
  );
};

export default Player;
