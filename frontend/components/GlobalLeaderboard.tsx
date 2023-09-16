'use client';
import { dummyData } from '@/constants/data';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type dataType = {
  team_id: string;
  team_code: string;
  team_name: string;
  rank: number;
};

const GlobalLeaderboard = () => {
  const [data, setData] = useState(dummyData);
  const [sortedData, setSortedData] = useState<dataType[]>([]);

  useEffect(() => {
    sortDataIntoRankings();
  }, []);

  const sortDataIntoRankings = () => {
    const slicedData = data.slice().sort((a, b) => a.rank - b.rank);
    setSortedData(slicedData);
  };

  const mappedData = () => {
    return sortedData.map((data, index) => (
      <tr key={index}>
        <td>{data.rank}</td>
        <td className="text-center">
          <Link href={`/${data.team_code}`}>{data.team_name}</Link>
        </td>
      </tr>
    ));
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Team Name</th>
          </tr>
        </thead>
        <tbody>{mappedData()}</tbody>
      </table>
    </div>
  );
};

export default GlobalLeaderboard;
