import axios from 'axios';

const PLAYER_URL =
  'https://uh4olt2xr7.execute-api.us-west-2.amazonaws.com/api/players';

export const getPlayerData = async (playerId?: string) => {
  // if no playerId, gets list of all players
  try {
    const response = playerId
      ? await axios.get(`${PLAYER_URL}/${playerId}`)
      : await axios.get(PLAYER_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    // throw error
    return error;
  }
};
