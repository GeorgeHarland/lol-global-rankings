'use client';
import { dummyData } from '@/constants/data';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { RankingType } from '@/types/types';

const GlobalLeaderboard = () => {
  const [data, setData] = useState(dummyData);
  const [sortedData, setSortedData] = useState<RankingType[]>([]);
  const [paginatedData, setPaginatedData] = useState<RankingType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(20);

  useEffect(() => {
    sortDataIntoRankings();
  }, [sortedData.length, currentPage]);

  const sortDataIntoRankings = () => {
    const slicedData = data.sort((a, b) => a.rank - b.rank);
    setSortedData(slicedData);
    Paginate();
  };

  const Paginate = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    console.log(indexOfFirstItem);

    if (sortedData)
      setPaginatedData(sortedData.slice(indexOfFirstItem, indexOfLastItem));
  };

  //Old TABLE FORMAT FUNCTION (CAN BE REMOVED YOUR PREFERENCE)
  // const mappedData = () => {
  //   return sortedData.map((data, index) => (
  //     <tr key={index}>
  //       <td>{data.rank}</td>
  //       <td className="text-center">
  //         <Link className="hover:underline" href={`/${data.team_code}`}>
  //           {data.team_name}
  //         </Link>
  //       </td>
  //     </tr>
  //   ));
  // };

  const NextPage = () => {
    setCurrentPage((prevState) => prevState + 1);
    Paginate();
  };

  const PreviousPage = () => {
    setCurrentPage((prevState) => prevState - 1);
    Paginate();
  };

  const mappedData = () => {
    return paginatedData.map((data, index) => (
      <div
        key={index}
        className="flex py-4 border-2 border-black rounded-lg mb-4"
      >
        <h2 className="mx-2 self-center">{data.rank}</h2>
        <Link
          className="hover:underline self-center"
          href={`/${data.team_code}`}
        >
          {data.team_name}
        </Link>
        <div className="ml-auto">
          <div className="flex">
            <div className="mx-4">
              <h1> Wins: 203</h1>
              <h1>Losses: 36</h1>
            </div>
            <div className="mr-4">
              <h1> Winrate: 84.94%</h1>
              <h1> Bayesian Percentage: 80.48%</h1>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    //OLD TABLE FORMAT (CAN BE REMOVED YOUR PREFERENCE)
    // <div>
    //   <table>
    //     <thead>
    //       <tr>
    //         <th>Rank</th>
    //         <th>Team Name</th>
    //       </tr>
    //     </thead>
    //     <tbody>{mappedData()}</tbody>
    //   </table>
    // </div>
    <div className="w-max">
      {mappedData()}
      <div className="flex gap-4">
        <button
          disabled={currentPage === 1}
          onClick={() => PreviousPage()}
          className="hover:underline"
        >
          Previous
        </button>
        <h2>
          {currentPage} / {Math.ceil(sortedData.length / itemsPerPage)}
        </h2>
        <button
          disabled={currentPage === Math.ceil(sortedData.length / itemsPerPage)}
          onClick={() => NextPage()}
          className="hover:underline"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default GlobalLeaderboard;
