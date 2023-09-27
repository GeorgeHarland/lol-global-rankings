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

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.toLowerCase();
    const isTeamOneInput = e.target.name === 'teamOneInput';

    const setInputFunction = isTeamOneInput ? setTeamOneInput : setTeamTwoInput;
    const setResultsFunction = isTeamOneInput ? setResultsOne : setResultsTwo;

    setInputFunction(input);

    const results = lolTeams.filter((team) => {
      return (
        (input && team.name && team.name.toLowerCase().includes(input)) ||
        team.abbreviation.toLowerCase().includes(input)
      );
    });

    if (input === '') {
      setResultsFunction([]);
    } else {
      setResultsFunction(results);
    }
  };

  const ResultOnClick = (
    value: string,
    setTeamInput: Function,
    setResults: Function
  ) => {
    setTeamInput(value);
    setResults([]);
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

        <input
          type="search"
          value={teamOneInput}
          onChange={(e) => handleInput(e)}
          name="teamOneInput"
        />
        <div>
          {resultsOne.map((res, index) => (
            <div
              key={index}
              onClick={() =>
                ResultOnClick(res.name, setTeamOneInput, setResultsOne)
              }
              className="hover:underline hover:cursor-pointer hover:font-bold"
            >
              {res.name}
            </div>
          ))}
        </div>
        <h2 className="font-bold text-lg">Team 2: </h2>
        <input
          type="search"
          value={teamTwoInput}
          onChange={(e) => handleInput(e)}
          name="teamTwoInput"
        />
        <div>
          {resultsTwo.map((res, index) => (
            <div
              key={index}
              onClick={() =>
                ResultOnClick(res.name, setTeamTwoInput, setResultsTwo)
              }
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
