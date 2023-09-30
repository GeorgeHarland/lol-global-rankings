'use client';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { getGlobalRankingsData } from '@/services/rankingServices';
import QuickCompare from './QuickCompare';
import { RankingType } from '@/types/types';

const GlobalLeaderboard = () => {
  const [data, setData] = useState<RankingType[]>([]);
  const [sortedData, setSortedData] = useState<RankingType[]>([]);
  const [paginatedData, setPaginatedData] = useState<RankingType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(20);
  const [numberOfTeamsToFetch, setNumberOfTeamsToFetch] = useState<number>(50);

  const Paginate = useCallback(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setPaginatedData(sortedData.slice(indexOfFirstItem, indexOfLastItem));
  }, [currentPage, itemsPerPage, sortedData]);

  useEffect(() => {
    const sortDataIntoRankings = () => {
      const slicedData = data.sort((a, b) => a.rank - b.rank);
      setSortedData(slicedData);
      Paginate();
    };
    sortDataIntoRankings();
  }, [sortedData.length, currentPage, data, Paginate]);

  console.log(paginatedData);

  useEffect(() => {
    const getGlobalRanking = async () => {
      const data = await getGlobalRankingsData(numberOfTeamsToFetch);
      setData(data);
    };
    getGlobalRanking();
  }, [numberOfTeamsToFetch]);

  const mappedData = () => {
    return paginatedData.map((data, index) => (
      <div
        key={index}
        className="flex py-2 border-2 border-black rounded-lg mb-4"
      >
        <h2 className="mx-2 self-center">{data.rank}</h2>
        <Link
          className="hover:underline self-center"
          href={`/teams/${data.team_id}`}
        >
          {data.team_name}
        </Link>

        <div className="flex ml-auto w-96">
          <div className="mx-4">
            <h1> Wins: {data.total_wins}</h1>
            <h1> Losses: {data.total_losses}</h1>
            <h1> Winrate: {(data.total_winrate * 100).toFixed(0)}%</h1>
          </div>
          <div className="mr-4">
            <h1> Region: {data.home_region}</h1>
            <h1>
              Tournaments:
              {data.tournaments_participated_in.length}
            </h1>
          </div>
        </div>
      </div>
    ));
  };

  if (!paginatedData.length) return <div>Loading...</div>;

  return (
    <div className="flex w-screen">
      <div className="flex-1 p-4">
        <h2 className="mb-4 text-center font-bold text-3xl">
          Top {numberOfTeamsToFetch} Teams
        </h2>
        {mappedData()}
        <div className="flex gap-4">
          <button
            disabled={currentPage === 1}
            hidden={currentPage === 1}
            onClick={() => setCurrentPage((prevState) => prevState - 1)}
          >
            Previous
          </button>
          <h2>
            {currentPage} / {Math.ceil(sortedData.length / itemsPerPage)}
          </h2>
          <button
            disabled={
              currentPage === Math.ceil(sortedData.length / itemsPerPage)
            }
            hidden={currentPage === Math.ceil(sortedData.length / itemsPerPage)}
            onClick={() => setCurrentPage((prevState) => prevState + 1)}
          >
            Next
          </button>
        </div>
      </div>
      <div className="mx-36 mt-20">
        <QuickCompare />
      </div>
    </div>
  );
};

export default GlobalLeaderboard;
