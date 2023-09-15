import Link from 'next/link';

const Player = ({
  teamName,
  playerName,
}: {
  teamName: string;
  playerName: string;
}) => {
  return <Link href={`${teamName}/${playerName}`}>{playerName}</Link>;
};

export default Player;
