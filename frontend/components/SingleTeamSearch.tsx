'use client';
import { useState } from 'react';
import { lolTeams } from '@/constants/lolDummyData';
import { teamFilter } from '@/utils';
import { TeamInfo } from '@/types/types';
import SearchResult from './SearchResult';
import { useRouter } from 'next/navigation';
import SearchResultContainer from './SearchResultContainer';

const SingleTeamSearch = () => {
  const [teamName, setTeamName] = useState<string>('');
  const [teamResults, setTeamResults] = useState<TeamInfo[]>([]);
  const [teamID, setTeamID] = useState('12139199912'); // Replace with actual ID
  const router = useRouter();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.toLowerCase();
    const results = teamFilter(lolTeams, input);

    setTeamName(input);

    if (input === '') {
      setTeamResults([]);
    } else {
      setTeamResults(results);
    }
  };

  const resultOnClick = (value: string) => {
    setTeamName(value);
    setTeamResults([]);
    //router.push(`/teams/${teamID}`);
  };
  return (
    <div className="flex flex-col items-center">
      <input
        type="search"
        value={teamName}
        onChange={(e) => handleOnChange(e)}
        className="outline-none pl-1 py-2 text-black rounded-lg w-1/4 text-center bg-gray-400 "
      />
      <SearchResultContainer
        results={teamResults}
        resultFunction={resultOnClick}
      />
    </div>
  );
};

export default SingleTeamSearch;
