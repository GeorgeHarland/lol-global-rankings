'use client';
import { TeamType } from '@/types/types';
import Player from './Player';
import Image from 'next/image';
import defaultLogo from '@/images/defaultLogo.png';

const TeamBasicStatsColumn = ({
  teamName,
  globalRank,
  championshipRating,
  playerRating,
  longevity,
  currentRoster,
  teamIconUrl,
}: TeamType) => {
  const currentRosterMap = () => {
    if (!currentRoster) return;
    return currentRoster.map((player, idx) => (
      <li key={idx}>
        <Player
          teamName={teamName}
          playerName={player.summonerName}
          role={player.role}
        />
      </li>
    ));
  };

  return (
    <div>
      <div className="border-2 rounded-lg border-black p-4 relative">
        {/* Doesnt look great I hate CSS */}
        {teamIconUrl ? (
          <Image
            src={teamIconUrl}
            alt={teamName}
            width={150}
            height={200}
            className="absolute inset-0 -z-10 opacity-50"
          />
        ) : (
          <Image
            src={defaultLogo}
            alt={teamName}
            width={300}
            height={400}
            className="absolute inset-0 -z-10 opacity-50 -top-10"
          />
        )}
        <h2 className="text-center font-bold text-lg">{teamName}</h2>
        <h4>Global Rank: {globalRank}</h4>
        <h4>Championship Rating: {championshipRating}</h4>
        <h4>Player Rating: {playerRating}</h4>
        <h4>Longevity: {longevity}</h4>
      </div>
      <div>
        <h2 className="text-center font-bold text-lg">Current Roster</h2>
        {currentRoster?.length ? (
          <ul>{currentRosterMap()}</ul>
        ) : (
          <div>No players on roster</div>
        )}
      </div>
    </div>
  );
};

export default TeamBasicStatsColumn;
