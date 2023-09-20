import Link from 'next/link';

const Player = ({
  teamName,
  playerName,
  role,
}: {
  teamName: string;
  playerName: string;
  role: string;
}) => {
  return (
    <Link href={`${teamName}/${playerName}`}>
      {playerName} - {role}
    </Link>
  );
};

export default Player;
