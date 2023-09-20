'use client';
import { TeamType } from '@/types/types';
import Player from './Player';
import { Play } from 'next/font/google';

const Team = ({
  teamName,
  globalRank,
  championshipRating,
  playerRating,
  longevity,
  currentRoster,
}: TeamType) => {
  const currentRosterMap = () => {
    if (!currentRoster) return;
    return currentRoster.map((player) => (
      <li>
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
      <div className="border-2 rounded-lg border-black p-4">
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

export default Team;
