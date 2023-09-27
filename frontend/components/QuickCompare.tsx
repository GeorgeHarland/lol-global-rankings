'use client';
import { lolRegions, lolTeams, lolTournaments } from '@/constants/lolDummyData';
import { useState } from 'react';
import SearchResult from './SearchResult';

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
        (input &&
          team.abbreviation &&
          team.abbreviation.toLowerCase().includes(input))
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
          className="outline-none pl-1 text-black"
        />
        <div>
          {resultsOne.map((res, index) => (
            <SearchResult
              teamName={res.name}
              key={index}
              ResultOnClick={() =>
                ResultOnClick(res.name, setTeamOneInput, setResultsOne)
              }
            />
          ))}
        </div>
        <h2 className="font-bold text-lg">Team 2: </h2>
        <input
          type="search"
          value={teamTwoInput}
          onChange={(e) => handleInput(e)}
          name="teamTwoInput"
          className="outline-none pl-1 text-black"
        />
        <div className="bg-white text-black  shadow-inner">
          {resultsTwo.map((res, index) => (
            <SearchResult
              teamName={res.name}
              key={index}
              ResultOnClick={() =>
                ResultOnClick(res.name, setTeamTwoInput, setResultsTwo)
              }
            />
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
