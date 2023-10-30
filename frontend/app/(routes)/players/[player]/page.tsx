'use client';

import { usePathname, useRouter } from 'next/navigation';
import { getPlayerData } from '@/services/playerServices';
import { PlayerType } from '@/types/types';
import { snakeToCamel } from '@/utils';
import { useEffect, useState } from 'react';

const PlayerPage = () => {
  const [playerData, setPlayerData] = useState<PlayerType>();
  const [loading, setLoading] = useState(true);
  const playerId = usePathname().match(/\d+/)?.toString();
  const router = useRouter();

  useEffect(() => {
    const GetPlayerData = async () => {
      try {
        const data = await getPlayerData(playerId);
        setPlayerData(snakeToCamel(data));
      } catch (error) {
        router.push('/');
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    GetPlayerData();
  }, [playerId]);

  if (loading) return <div>Loading...</div>;
  if(!playerData?.handle) return <div>No data found for the given playerID</div>
  return <div>
      <h1>{playerData?.handle}</h1>
      <h1>{playerData?.firstName}</h1>
      {playerData?.lastName}
      <h1>{playerData?.homeTeamId}</h1>
    </div>
};

export default PlayerPage;
