import axios from 'axios';

const BASE_URL = 'https://uh4olt2xr7.execute-api.us-west-2.amazonaws.com/api/'; // PROBABLY SHOULD BE MOVED TO .ENV FILE

export const getRankingData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/winlossgames`);
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
      `${BASE_URL}/global_rankings?number_of_teams=${teamsToFetch}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data: ', error);
    return error;
  }
};
