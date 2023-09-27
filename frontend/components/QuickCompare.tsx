import { lolRegions, lolTeams, lolTournaments } from '@/constants/lolDummyData';
import { useState } from 'react';

const QuickCompare = () => {
  const [teamOneID, setTeamOneID] = useState<number>();
  const [teamTwoID, setTeamTwoID] = useState<number>();

  return (
    <>
      <div className="flex flex-col">
        <h2 className="font-bold text-xl">Find past tournament Rankings:</h2>
        <h2 className="font-bold text-lg">Region:</h2>
        <select>
          {Object.entries(lolRegions).map(([region, fullRegionName]) => (
            <option key={region}>{fullRegionName}</option>
          ))}
        </select>
        <h2 className="font-bold text-lg">Tournament:</h2>
        <select>
          {Object.entries(lolTournaments).map(
            ([tournament, tournamentName]) => (
              <option key={tournament}>{tournament}</option>
            )
          )}
        </select>
        <button className="mt-4 bg-green-600 rounded-lg p-2 text-white hover:bg-green-800">
          Find Rankings
        </button>
      </div>
      <div className="mt-6 flex flex-col">
        <h2 className="font-bold text-2xl">Team Compare</h2>

        <h2 className="font-bold text-lg">Team 1: </h2>
        <select>
          {Object.entries(lolTeams).map(([teamCode, teamName]) => (
            <option key={teamCode}>{teamName}</option>
          ))}
        </select>
        <h2 className="font-bold text-lg">Team 2: </h2>
        <select>
          {Object.entries(lolTeams).map(([teamCode, teamName]) => (
            <option key={teamCode}>{teamName}</option>
          ))}
        </select>
        <button className="mt-4 bg-green-600 rounded-lg p-2 text-white hover:bg-green-800">
          Compare
        </button>
      </div>
    </>
  );
};

export default QuickCompare;
