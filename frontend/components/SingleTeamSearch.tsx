'use client';
import { useEffect, useState } from 'react';
import { teamFilter } from '@/utils';
import { RankingType, TeamInfo } from '@/types/types';
import { useRouter } from 'next/navigation';
import SearchResultContainer from './SearchResultContainer';
import { getTeamData } from '@/services/teamServices';

const SingleTeamSearch = () => {
  const [teamName, setTeamName] = useState<string>('');
  const [teamResults, setTeamResults] = useState<RankingType[]>([]);
  const [teams, setTeams] = useState([]);
  const [teamID, setTeamID] = useState('');
  const [showLoading, setShowLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getTeams = async () => {
      const result = await getTeamData();
      setTeams(result);
    };
    getTeams();
  }, []);

  console.log(teams);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.toLowerCase();
    const results = teamFilter(teams, input); // MAY NEED TO CHANGE THIS LOGIC TO RETURN ID OR SOMETHING

    setTeamName(input);

    if (input === '') {
      setTeamResults([]);
    } else {
      setTeamResults(results);
    }
  };

  const resultOnClick = (value: string, teamID: string) => {
    setTeamName(value);
    setTeamResults([]);
    setTeamID(teamID);
    setShowLoading(true);
    router.push(`/teams/${teamID}`);
  };
  return (
    <div className="flex flex-col items-center">
      <input
        type="search"
        value={teamName || undefined}
        onChange={(e) => handleOnChange(e)}
        className="outline-none pl-1 py-2 text-black rounded-lg w-1/4 text-center bg-white"
        placeholder="Search for a team"
      />
      <SearchResultContainer
        results={teamResults}
        resultFunction={resultOnClick}
      />
      {showLoading ? <div className="mt-2 text-lg">Loading...</div> : null}
    </div>
  );
};

export default SingleTeamSearch;
