'use client';

import { getPlayerData } from '@/services/playerServices';
import { PlayerType } from '@/types/types';
import { snakeToCamel } from '@/utils';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const PlayerPage = () => {
  const [playerData, setPlayerData] = useState<PlayerType>();
  const playerId = usePathname().match(/\d+/)?.toString();

  useEffect(() => {
    const GetPlayerData = async () => {
      try {
        const data = await getPlayerData(playerId);
        setPlayerData(snakeToCamel(data));
      } catch (error) {
        // router.push('/');
        console.log(error);
      }
    };
    GetPlayerData();
  }, [playerId]);

  if (!playerId) return <div>Loading...</div>;
  return (
    <div>
      PlayerPage<h1>{playerData?.handle}</h1>
      <h1>{playerData?.firstName}</h1>
      {playerData?.lastName}
      <h1>{playerData?.homeTeamId}</h1>
    </div>
  );
};

export default PlayerPage;
