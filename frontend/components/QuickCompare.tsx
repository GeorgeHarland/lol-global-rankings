'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SearchResult from './SearchResult';
import { getTeamData } from '@/services/teamServices';
import { lolRegions, lolTournaments } from '@/constants/lolDummyData';
import { teamFilter } from '@/utils';
import { RankingType } from '@/types/types';

const QuickCompare = () => {
  const [teamInputs, setTeamInputs] = useState<string[]>(['', '']);
  const [teams, setTeams] = useState([]);
  const [teamIDs, setTeamIDs] = useState<string[]>([]);
  const [results, setResults] = useState<RankingType[][]>([[], []]);
  const router = useRouter();

  useEffect(() => {
    const getTeams = async () => {
      const result = await getTeamData();
      setTeams(result);
    };
    getTeams();
  }, []);

  const handleInput = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedInputs = [...teamInputs];
    updatedInputs[index] = e.target.value.toLowerCase();
    setTeamInputs(updatedInputs);

    const filteredResults = teamFilter(teams, updatedInputs[index]);
    const updatedResults = [...results];
    updatedResults[index] = updatedInputs[index] ? filteredResults : [];
    setResults(updatedResults);
  };

  const ResultOnClick = (
    index: number,
    value: string,
    teamID: string
  ) => {
    const updatedInputs = [...teamInputs];
    updatedInputs[index] = value;
    setTeamInputs(updatedInputs);

    const updatedResults = [...results];
    updatedResults[index] = [];
    setResults(updatedResults);

    const updatedTeamIDs = [...teamIDs];
    updatedTeamIDs[index] = teamID;
    setTeamIDs(updatedTeamIDs);
  };

  const onCompare = () => {
    const teamsQuery = teamIDs.map(id => `teams=${id}`).join('&');
    router.push(`/compare?${teamsQuery}`);
  };

  const addTeam = () => {
    setTeamInputs([...teamInputs, '']);
    setTeamIDs([...teamIDs, '']);
    setResults([...results, []]);
  };

  const removeTeam = (index: number) => {
    setTeamInputs(teamInputs.filter((_, idx) => idx !== index));
    setTeamIDs(teamIDs.filter((_, idx) => idx !== index));
    setResults(results.filter((_, idx) => idx !== index));
  }

  return (<>
    <div className="flex flex-col">
        <h2 className="font-bold text-2xl">Rankings by tournament: </h2>
        <h2 className="font-bold text-lg">Filter Region:</h2>
        <select>
          {Object.entries(lolRegions).map(([region, fullRegionName]) => (
            <option key={region}>{fullRegionName}</option>
          ))}
        </select>
        <h2 className="font-bold text-lg">Filter Year:</h2>
        <select>
          {Object.entries(lolTournaments).map(
            ([tournament, tournamentName]) => (
              <option key={tournament}>{tournament}</option>
            )
          )}
        </select>
        <button className="mt-4 bg-orange-800 rounded-lg p-2 text-white hover:bg-orange-700">
          Find Rankings
        </button>
      </div>
    <div className="mt-6 flex flex-col">
      <h2 className="font-bold text-2xl">Compare team stats:</h2>
      {teamInputs.map((teamInput, index) => (
        <div key={index}>
          <h2 className="font-bold text-lg">Team {index + 1}: </h2>
          <div className="flex justify-between">
          <input
            type="search"
            value={teamInput}
            onChange={(e) => handleInput(index, e)}
            className="outline-none pl-8 text-black"
          /><button className="max-h-12 w-6 h-6 bg-slate-500 text-white shadow-inner rounded-md" onClick={() => removeTeam(index)}>🗑</button></div>
          <div className="max-h-12 overflow-y-scroll bg-white text-black shadow-inner">
            {results[index].map((res, idx) => (
              <SearchResult
                teamName={res.team_name}
                key={idx}
                ResultOnClick={() => ResultOnClick(index, res.team_name, res.team_id)}
              />
            ))}
          </div>
        </div>
      ))}
      <button className="mt-4 bg-orange-800 rounded-lg p-2 text-white hover:bg-orange-700" onClick={addTeam}>
        + Add Team
      </button>
      <button className="mt-4 bg-orange-800 rounded-lg p-2 text-white hover:bg-orange-700" onClick={() => onCompare()}>
        Compare
      </button>
    </div></>
  );
};

export default QuickCompare;
