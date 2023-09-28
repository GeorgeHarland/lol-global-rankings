import Link from 'next/link';

const Player = ({
  teamCode,
  playerName,
  role,
}: {
  teamCode: string;
  playerName: string;
  role: string;
}) => {
  return (
    <Link href={`${teamCode}/${playerName}`}>
      {playerName} - {role}
    </Link>
  );
};

export default Player;
