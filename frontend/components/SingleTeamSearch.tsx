'use client';
import { useState } from 'react';
import { lolTeams } from '@/constants/lolDummyData';
import { teamFilter } from '@/utils';
import { TeamInfo } from '@/types/types';
import SearchResult from './SearchResult';
import { useRouter } from 'next/navigation';

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
    <div>
      <input
        type="search"
        value={teamName}
        onChange={(e) => handleOnChange(e)}
      />
      {teamResults.map((result, index) => (
        <SearchResult
          key={index}
          teamName={result.name}
          ResultOnClick={() => resultOnClick(result.name)}
        />
      ))}
    </div>
  );
};

export default SingleTeamSearch;
