import axios from 'axios';

const RANKING_URL =
  'https://uh4olt2xr7.execute-api.us-west-2.amazonaws.com/api/winlossgames';

export const getRankingData = async () => {
  try {
    const response = await axios.get(RANKING_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching data: ', error);
    // throw error
    return error;
  }
};

export const getGlobalRankingsData = async (teamsToFetch: number = 50) => {
  try {
    const response = await axios.get(
      `https://uh4olt2xr7.execute-api.us-west-2.amazonaws.com/api/global_rankings?number_of_teams=${teamsToFetch}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data: ', error);
    return error;
  }
};
