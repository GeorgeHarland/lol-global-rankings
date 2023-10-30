'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react';

interface TeamStat {
  teamName: string;
  stats: Record<string, string>;
}

const CompareTeamsTable = () => {
  const searchParams = useSearchParams();
  const teamsParam = searchParams.getAll('teams');
  const [teams, setTeams] = useState<TeamStat[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (teamsParam && teamsParam.length) {
      const fetchTeams = async () => {
        const fetchedTeams = await Promise.all(
          teamsParam.map(async (id) => {
            return {
              teamName: `Team ${id}`,
              stats: {
                "Average Kills": "7.2",
                "Average Deaths": "6.4",
                "Average Dragons": "3.4",
                "Average Barons": "0.8",
                "Total Winrate": "54%",
              },
            };
          })
        );

        setTeams(fetchedTeams);
        setIsLoading(false);
      };

      fetchTeams();
    }
  }, [teamsParam]);


  if (isLoading) return <div>Loading...</div>;

    return (
        <table className="min-w-full divide-y divide-gray-200 bg-yellow-100 rounded-lg overflow-hidden shadow-lg">
            <thead className="bg-yellow-200">
                <tr>
                    <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-800 uppercase tracking-wider"></th>
                    {Object.keys(teams[0]?.stats || {}).map(statName => (
                        <th key={statName} className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-800 uppercase tracking-wider">
                            {statName}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
                {teams.map(team => (
                    <tr key={team.teamName}>
                        <th className="px-6 py-4 text-sm leading-5 font-bold text-gray-900 bg-yellow-200">
                            {team.teamName}
                        </th>
                        {Object.values(team.stats).map((statValue, idx) => (
                            <td key={idx} className="px-6 py-4 text-sm leading-5 text-gray-900">
                                {statValue}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default CompareTeamsTable;
