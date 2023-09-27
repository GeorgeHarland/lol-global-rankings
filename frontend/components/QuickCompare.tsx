'use client';
import { lolRegions, lolTeams, lolTournaments } from '@/constants/lolDummyData';
import { useState } from 'react';

type TeamInfo = {
  abbreviation: string;
  name: string;
};

const QuickCompare = () => {
  const [teamOneInput, setTeamOneInput] = useState<string>();
  const [teamTwoInput, setTeamTwoInput] = useState<string>();
  const [teamOneID, setTeamOneID] = useState<number>();
  const [teamTwoID, setTeamTwoID] = useState<number>();
  const [resultsOne, setResultsOne] = useState<TeamInfo[]>([]);
  const [resultsTwo, setResultsTwo] = useState<TeamInfo[]>([]);

  const handleInputOne = (input: string) => {
    setTeamOneInput(input);
    const res = lolTeams.filter((team) => {
      return (
        (input && team.name && team.name.toLowerCase().includes(input)) ||
        team.abbreviation.toLowerCase().includes(input)
      );
    });
    if (input == '') return setResultsOne([]);
    setResultsOne(res);
  };

  const handleInputTwo = (input: string) => {
    setTeamTwoInput(input);
    const res = lolTeams.filter((team) => {
      return (
        (input && team.name && team.name.toLowerCase().includes(input)) ||
        team.abbreviation.toLowerCase().includes(input)
      );
    });
    if (input == '') return setResultsTwo([]);
    setResultsTwo(res);
  };

  const onClickOne = (value: string) => {
    setTeamOneInput(value);
    setResultsOne([]);
  };
  const onClickTwo = (value: string) => {
    setTeamTwoInput(value);
    setResultsTwo([]);
  };

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
        {/* <select>
          {Object.entries(lolTeams).map(([teamCode, teamName]) => (
            <option key={teamCode}>{teamName}</option>
          ))}
        </select> */}
        <input
          type="search"
          value={teamOneInput}
          onChange={(e) => handleInputOne(e.target.value.toLowerCase())}
        />
        <div>
          {resultsOne.map((res, index) => (
            <div
              key={index}
              onClick={() => onClickOne(res.name)}
              className="hover:underline hover:cursor-pointer hover:font-bold"
            >
              {res.name}
            </div>
          ))}
        </div>
        <h2 className="font-bold text-lg">Team 2: </h2>
        {/* <select>
          {Object.entries(lolTeams).map(([teamCode, teamName]) => (
            <option key={teamCode}>{teamName}</option>
          ))}
        </select> */}
        <input
          type="search"
          value={teamTwoInput}
          onChange={(e) => handleInputTwo(e.target.value)}
        />
        <div>
          {resultsTwo.map((res, index) => (
            <div
              key={index}
              onClick={() => onClickTwo(res.name)}
              className="hover:underline hover:cursor-pointer hover:font-bold"
            >
              {res.name}
            </div>
          ))}
        </div>
        <button className="mt-4 bg-green-600 rounded-lg p-2 text-white hover:bg-green-800">
          Compare
        </button>
      </div>
    </>
  );
};

export default QuickCompare;
