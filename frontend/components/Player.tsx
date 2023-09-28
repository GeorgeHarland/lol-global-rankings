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
  return (
    <Link href={`/players/${playerID}`}>
      {playerName} - {role}
    </Link>
  );
};

export default Player;
