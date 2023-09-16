import axios from 'axios';

const TEAM_URL =
  'https://uh4olt2xr7.execute-api.us-west-2.amazonaws.com/api/teams';

export const getTeamData = async (teamName: string = '') => {
  // if no teamName, gets list of all teams
  try {
    const response = teamName
      ? await axios.get(`${TEAM_URL}/${teamName}`)
      : await axios.get(TEAM_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    // throw error
    return error;
  }
};
