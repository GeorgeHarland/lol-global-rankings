'use client';

import GlobalLeaderboard from '@/components/GlobalLeaderboard';
import { getRankingData } from '@/services/rankingServices';
import { useState, useEffect } from 'react';

const Home = () => {
  const [rankingsData, setRankingsData] = useState(null);

  // useEffect(() => {
  //   const fetchRankingsData = async () => {
  //     try {
  //       const data = await getRankingData();
  //       setRankingsData(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchRankingsData();
  // }, []);

  // if (!rankingsData) return <div>Loading...</div>;

  // want some rankings table component
  // needs to work with a different data format though - to match the riot api format
  return (
    <div className="flex">
      {/* <div>
        {rankingsData.top_10_rankings.map(([teamId, teamDetails], index) => (
          <div key={teamId}>
            <strong>{teamDetails.teamname}</strong>
            <br />
            Wins: {teamDetails.wins}
            <br />
            Losses: {teamDetails.losses}
            <br />
            Winrate: {teamDetails.winrate}
            <br />
            Bayesian Percentage: {teamDetails.bayesianPercentage}
            <br />
            <br />
          </div>
        ))}
      </div> */}
      <GlobalLeaderboard />
    </div>
  );
};

export default Home;
