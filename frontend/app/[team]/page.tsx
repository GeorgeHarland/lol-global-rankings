'use client';

import React, { useState, useEffect } from 'react';
import TeamProfileContainer from '@/components/TeamProfileContainer';
import { getTeamData } from '@/services/teamServices';

const TeamPage = () => {
  const [teamData, setTeamData] = useState(null);
  // const router = useRouter();

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const data = await getTeamData('Cloud9');
        setTeamData(data);
      } catch (error) {
        // router.push('/');
        console.log(error);
      }
    };

    fetchTeamData();
  }, []);

  if (!teamData) return <div>Loading...</div>;

  return <TeamProfileContainer teamData={teamData} />;
};

export default TeamPage;
