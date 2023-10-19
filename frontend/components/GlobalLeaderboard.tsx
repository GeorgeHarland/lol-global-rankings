'use client';
import Link from 'next/link';
import Image from 'next/image';
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
        className="flex py-2 border-1 border-orange-800 rounded-3xl mb-4 bg-orange-800 items-center"
      >
        <h2 className="mx-4 self-center text-lg font-bold">{data.rank}.</h2>
        <div className="w-12 h-12">
        {data.team_icon_url ? (
        <Image
            src={data.team_icon_url}
            alt={data.team_code}
            width={40}
            height={30}
            layout='responsive'
            className=""
        />
    ) : (
        <Image
            src={defaultLogo}
            alt={data.team_code}
            width={60}
            height={90}
            className="responsive"
        />
    )}</div>
        <Link
          className="hover:underline self-center mx-4"
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
    <div className="flex flex-col lg:flex-row w-screen">
      <div className="flex-1 p-4">
        <h2 className="mb-4 font-bold text-3xl">
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
