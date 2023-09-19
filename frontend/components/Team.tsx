'use client';
import { TeamType } from '@/types/types';
import Player from './Player';

const Team = ({
  teamName,
  globalRank,
  championshipRating,
  playerRating,
  longevity,
}: TeamType) => {
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
        <ul>
          <li>
            <Player teamName={teamName} playerName="Zeus" />
          </li>
          <li>
            <Player teamName={teamName} playerName="Oner" />
          </li>
          <li>
            <Player teamName={teamName} playerName="Faker" />
          </li>
          <li>
            <Player teamName={teamName} playerName="Gumayusi" />
          </li>
          <li>
            <Player teamName={teamName} playerName="Keria" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Team;
