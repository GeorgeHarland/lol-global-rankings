'use client';
import { usePathname } from 'next/navigation';
import Dropdown from './Dropdown';
import Team from './Team';
import { useEffect, useState } from 'react';
import { getTeamData } from '@/services/teamServices';
import { TeamType } from '@/types/types';
import { snakeToCamel } from '@/utils';
import Image from 'next/image';

const TeamProfileContainer = () => {
  const [teamData, setTeamData] = useState<TeamType>();
  const teamID = usePathname().substring(1);

  const GetTeamData = async () => {
    try {
      const data = await getTeamData(teamID);
      setTeamData(snakeToCamel(data));
    } catch (error) {
      // router.push('/');
      console.log(error);
    }
  };
  useEffect(() => {
    GetTeamData();
  }, []);

  console.log(teamData, teamData?.teamIconUrl);

  if (!teamData) return <div>Loading...</div>;

  return (
    <div className="m-4">
      <div className="flex gap-6  ">
        <Team
          teamName={teamData.teamName}
          globalRank={3}
          championshipRating={1039}
          playerRating={1599}
          longevity={1900}
          currentRoster={teamData?.currentRoster}
          teamIconUrl={teamData.teamIconUrl}
        />
        <Dropdown />
      </div>
    </div>
  );
};

export default TeamProfileContainer;
