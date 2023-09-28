'use client';
import { usePathname } from 'next/navigation';
import TeamDropdown from './TeamDropdown';
import TeamBasicStatsColumn from './TeamBasicStatsColumn';
import TeamGraphColumn from './TeamGraphColumn'
import { useEffect, useState } from 'react';
import { getTeamData } from '@/services/teamServices';
import { TeamType } from '@/types/types';
import { snakeToCamel } from '@/utils';

const TeamProfileContainer = () => {
  const [teamData, setTeamData] = useState<TeamType>();
  const teamID = usePathname().match(/\d+/)?.toString();

  useEffect(() => {
    const GetTeamData = async () => {
      try {
        const data = await getTeamData(teamID);
        setTeamData(snakeToCamel(data));
      } catch (error) {
        // router.push('/');
        console.log(error);
      }
    };
    GetTeamData();
  }, [teamID]);

  if (!teamData) return <div>Loading...</div>;

  return (
    <div className="m-4">
      <div className="flex gap-6  ">
        <TeamBasicStatsColumn
          teamName={teamData.teamName}
          globalRank={3}
          championshipRating={1039}
          playerRating={1599}
          longevity={1900}
          currentRoster={teamData?.currentRoster}
          teamIconUrl={teamData.teamIconUrl}
        />
        <TeamDropdown />
        <TeamGraphColumn />
      </div>
    </div>
  );
};

export default TeamProfileContainer;
