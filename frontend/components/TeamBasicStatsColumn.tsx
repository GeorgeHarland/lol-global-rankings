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
          playerID={player.playerId}
          playerName={player.summonerName}
          role={player.role}
        />
      </li>
    ));
  };

  return (
    <div className="relative"> {/* Ensures children with absolute positioning are relative to this div */}
    {teamIconUrl ? (
        <Image
            src={teamIconUrl}
            alt={teamCode}
            width={300}
            height={400}
            className="absolute -z-10 opacity-50"
        />
    ) : (
        <Image
            src={defaultLogo}
            alt={teamCode}
            width={300}
            height={400}
            className="absolute -z-10 opacity-50"
        />
    )}
      <div className="relative">
        <h2 className="font-bold text-xl pb-4">{teamName}</h2>
        <h4 className="text-lg">Global Rank: {rank}</h4>
        <h4 className="text-lg">Enhanced Rating: {enhancedRating}</h4>
        <h4 className="text-lg">Elo Rating: {eloRating}</h4>
      </div>
      <div>
        <h2 className="text-center font-bold text-lg pt-4">Current Roster</h2>
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
