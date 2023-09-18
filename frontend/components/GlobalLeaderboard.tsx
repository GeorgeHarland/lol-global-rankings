'use client';
import { dummyData } from '@/constants/data';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { RankingType } from '@/types/types';

const GlobalLeaderboard = () => {
  const [data, setData] = useState(dummyData);
  const [sortedData, setSortedData] = useState<RankingType[]>([]);

  useEffect(() => {
    sortDataIntoRankings();
  }, []);

  const sortDataIntoRankings = () => {
    const slicedData = data.sort((a, b) => a.rank - b.rank);
    setSortedData(slicedData);
  };

  const mappedData = () => {
    return sortedData.map((data, index) => (
      <tr key={index}>
        <td>{data.rank}</td>
        <td className="text-center">
          <Link className="hover:underline" href={`/${data.team_code}`}>
            {data.team_name}
          </Link>
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
