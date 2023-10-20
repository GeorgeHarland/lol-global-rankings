'use client';
import { TeamType } from '@/types/types';
import Player from './Player';
import Image from 'next/image';
import defaultLogo from '@/images/defaultLogo.png';

const roleOrder: { [key: string]: number } = {
  top: 1,
  jungle: 2,
  mid: 3,
  bottom: 4,
  support: 5,
  None: 6,
  none: 7,
};

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

    currentRoster.sort((a, b) => {
      if (a.role === b.role) {
        return a.summonerName.localeCompare(b.summonerName);
      }
      return roleOrder[a.role] - roleOrder[b.role];
    });

    return currentRoster.map((player, idx) => (
      <li key={idx} className="mt-2">
        <Player
          playerID={player.playerId}
          playerName={player.summonerName}
          role={player.role}
        />
      </li>
    ));
  };

  return (
    <>
      {teamIconUrl ? (
        <Image
          src={teamIconUrl}
          alt={teamCode}
          width={400}
          height={600}
          className="absolute -z-10 opacity-30"
        />
      ) : (
        <Image
          src={defaultLogo}
          alt={teamCode}
          width={400}
          height={600}
          className="absolute -z-10 opacity-50"
        />
      )}
      <div className="relative">
        <h2 className="font-bold text-xl pb-4">{teamName}</h2>
        <h4 className="text-lg">Global Rank: {rank}</h4>
        <h4 className="text-lg">Enhanced Rating: {enhancedRating}</h4>
        <h4 className="text-lg">Elo Rating: {eloRating}</h4>
        <h2 className="text-center font-bold text-lg pt-4">Current Roster</h2>
        {currentRoster?.length ? (
          <ul>{currentRosterMap()}</ul>
        ) : (
          <div>No players found on roster</div>
        )}
      </div>
    </>
  );
};

export default TeamBasicStatsColumn;
