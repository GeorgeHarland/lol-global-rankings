'use client';
import { usePathname } from 'next/navigation';
import TeamDropdown from './TeamDropdown';
import TeamBasicStatsColumn from './TeamBasicStatsColumn';
import TeamGraphColumn from './TeamGraphColumn';
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

  console.log(teamData);

  if (!teamData) return <div>Loading...</div>;

  return (
    <div className="m-4">
      <div className="flex gap-6  ">
        <TeamBasicStatsColumn
          teamName={teamData.teamName}
          teamCode={teamData.teamCode}
          rank={teamData.rank}
          eloRating={Math.ceil(teamData.eloRating) ?? 'N/A'}
          enhancedRating={Math.ceil(teamData.eloRating) ?? 'N/A'} // REPLACE WITH REAL ENHANCED RATING
          currentRoster={teamData?.currentRoster}
          teamIconUrl={teamData.teamIconUrl}
        />
        <TeamDropdown content={teamData.tournamentsParticipatedIn} />
        <TeamGraphColumn />
      </div>
    </div>
  );
};

export default TeamProfileContainer;
