'use client';
import { TeamType } from '@/types/types';
import Player from './Player';
import Image from 'next/image';
import defaultLogo from '@/images/defaultLogo.png';

const TeamBasicStatsColumn = ({
  teamName,
  teamCode,
  rank,
  eloRating,
  enhancedRating,
  currentRoster,
  teamIconUrl,
}: TeamType) => {
  const currentRosterMap = () => {
    if (!currentRoster) return;
    return currentRoster.map((player, idx) => (
      <li key={idx}>
        <Player
          teamCode={teamCode}
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
            alt={teamCode}
            width={150}
            height={200}
            className="absolute inset-0 -z-10 opacity-50"
          />
        ) : (
          <Image
            src={defaultLogo}
            alt={teamCode}
            width={300}
            height={400}
            className="absolute inset-0 -z-10 opacity-50 -top-10"
          />
        )}
        <h2 className="text-center font-bold text-lg">{teamName}</h2>
        <h4>Global Rank: {rank}</h4>
        <h4>Enhanced Rating: {enhancedRating}</h4>
        <h4>Elo Rating: {eloRating}</h4>
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
