import axios from 'axios';

const RANKING_URL =
"https://uh4olt2xr7.execute-api.us-west-2.amazonaws.com/api/winlossgames";

export const getRankingData = async () => {
  try {
    const response = await axios.get(RANKING_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    // throw error
    return error;
  }
};
