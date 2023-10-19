'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SearchResult from './SearchResult';
import { getTeamData } from '@/services/teamServices';
import { lolRegions, lolTournaments } from '@/constants/lolDummyData';
import { teamFilter } from '@/utils';
import { RankingType } from '@/types/types';

const QuickCompare = () => {
  const [teamOneInput, setTeamOneInput] = useState<string>('');
  const [teamTwoInput, setTeamTwoInput] = useState<string>('');
  const [teams, setTeams] = useState([]);
  const [teamOneID, setTeamOneID] = useState<string>();
  const [teamTwoID, setTeamTwoID] = useState<string>();
  const [resultsOne, setResultsOne] = useState<RankingType[]>([]);
  const [resultsTwo, setResultsTwo] = useState<RankingType[]>([]);
  const router = useRouter();

  useEffect(() => {
    const getTeams = async () => {
      const result = await getTeamData();
      setTeams(result);
    };
    getTeams();
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.toLowerCase();
    const isTeamOneInput = e.target.name === 'teamOneInput';

    const setInputFunction = isTeamOneInput ? setTeamOneInput : setTeamTwoInput;
    const setResultsFunction = isTeamOneInput ? setResultsOne : setResultsTwo;

    setInputFunction(input);

    const results = teamFilter(teams, input);

    setResultsFunction(input ? results : []);
  };

  const ResultOnClick = (
    value: string,
    teamID: string,
    setTeamInput: Function,
    setResults: Function,
    setTeamID: Function
  ) => {
    setTeamInput(value);
    setResults([]);
    setTeamID(teamID);
  };

  const onCompare = () => {
    router.push(`/compare/${teamOneID}/${teamTwoID}`);
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
        <button className="mt-4 bg-orange-700 rounded-lg p-2 text-white hover:bg-orange-800">
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
        <div className="max-h-96 overflow-y-scroll bg-white text-black  shadow-inner">
          {resultsOne.map((res, index) => (
            <SearchResult
              teamName={res.team_name}
              key={index}
              ResultOnClick={() =>
                ResultOnClick(
                  res.team_name,
                  res.team_id,
                  setTeamOneInput,
                  setResultsOne,
                  setTeamOneID
                )
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
        <div className="max-h-96 overflow-y-scroll bg-white text-black  shadow-inner">
          {resultsTwo.map((res, index) => (
            <SearchResult
              teamName={res.team_name}
              key={index}
              ResultOnClick={() =>
                ResultOnClick(
                  res.team_name,
                  res.team_id,
                  setTeamTwoInput,
                  setResultsTwo,
                  setTeamTwoID
                )
              }
            />
          ))}
        </div>
        <button
          className="mt-4 bg-orange-700 rounded-lg p-2 text-white hover:bg-orange-800"
          onClick={() => onCompare()}
        >
          Compare
        </button>
      </div>
    </>
  );
};

export default QuickCompare;
