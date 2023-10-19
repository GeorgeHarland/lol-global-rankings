'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { getGlobalRankingsData } from '@/services/rankingServices';
import QuickCompare from './QuickCompare';
import { RankingType } from '@/types/types';
import defaultLogo from '@/images/defaultLogo.png';

const GlobalLeaderboard = () => {
  const [data, setData] = useState<RankingType[]>([]);
  const [sortedData, setSortedData] = useState<RankingType[]>([]);
  const [paginatedData, setPaginatedData] = useState<RankingType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [numberOfTeamsToFetch, setNumberOfTeamsToFetch] = useState<number>(50);

  const router = useRouter();

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
      <button
        key={index}
        className="flex py-2 border-1 border-orange-800 rounded-3xl mb-4 bg-orange-800 items-center hover:bg-orange-700 hover:border-orange-700 w-full"
        onClick={() => router.push(`/teams/${data.team_id}`)}
      >
        <h2 className="mx-4 self-center text-lg font-bold">{data.rank}.</h2>
        <div className="w-12 h-12 mx-2">
        {data.team_icon_url ? (
        <Image
            src={data.team_icon_url}
            alt={data.team_code}
            width={40}
            height={30}
            layout='responsive'
        />
    ) : (
        <Image
            src={defaultLogo}
            alt={data.team_code}
            width={60}
            height={90}
            layout="responsive"
        />)}
        </div>
        <h1 className="self-center mx-4 flex-grow">{data.team_name}</h1>
        <div className="flex w-96 justify-end">
          <div className="w-1/2 text-right mr-8">
            <h1>Enhanced Elo: {data.elo_rating.toFixed(0)}</h1>
            <h1>Elo: {data.elo_rating.toFixed(0)}</h1>
            <h1>Region: {data.home_region}</h1>
          </div>
          <div className="w-1/2 text-right mr-8">
            <h1>Winrate: {(data.total_winrate * 100).toFixed(0)}%</h1>
            <h1>Total Wins: {data.total_wins}</h1>
            <h1>Total Losses: {data.total_losses}</h1>
          </div>
        </div>
      </button>
    ));
  };
  

  if (!paginatedData.length) return <div>Loading...</div>;

  return (
    <div className="flex flex-col lg:flex-row w-screen">
      <div className="flex-1 p-4">
        <h2 className="mb-4 font-bold text-3xl">
          Top Global Teams
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
      <div className="mx-24 mt-12">
      {/* <div className="flex flex-col w-full"> */}
        <QuickCompare />
      </div>
    </div>
  );
};

export default GlobalLeaderboard;
