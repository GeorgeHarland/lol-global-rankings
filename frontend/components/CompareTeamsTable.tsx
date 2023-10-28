'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react';

interface TeamStat {
  teamName: string;
  stats: Record<string, string>;
}

const CompareTeamsTable = () => {
  const searchParams = useSearchParams();
  const teamsParam = searchParams.getAll('teams');  // This should return an array of all 'teams' parameters.
  const [teams, setTeams] = useState<TeamStat[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (teamsParam && teamsParam.length) {
      // Fetch team data based on IDs - Here's a mock example
      const fetchTeams = async () => {
        const fetchedTeams = await Promise.all(
          teamsParam.map(async (id) => {
            // Replace with your fetching logic
            // For now, just return dummy data
            return {
              teamName: `Team ${id}`,
              stats: {
                "Average Kills": "5",
                "Average Deaths": "6",
                // ... other stats
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
  const StatTableRow = ({
    statName,
    stats,
  }: {
    statName: string;
    stats: string[];
  }) => {
    return (
      <tr>
        <th className="px-6 py-4 text-sm leading-5 font-bold text-gray-900">
          {statName}
        </th>
        {stats.map((stat, idx) => (
          <td key={idx} className="px-6 py-4 text-sm leading-5 text-gray-900">
            {stat}
          </td>
        ))}
      </tr>
    );
  };

  const TeamTableHead = ({ teamName }: { teamName: string }) => {
    return (
      <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
        {teamName}
      </th>
    );
  };

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          <th></th>
          {teams?.map((team, idx) => (
            <TeamTableHead key={idx} teamName={team.teamName} />
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {Object.entries(teams[0]?.stats).map(([statName, _]) => (
          <StatTableRow
            key={statName}
            statName={statName}
            stats={teams.map((team) => team.stats[statName])}
          />
        ))}
      </tbody>
    </table>
  );
};

export default CompareTeamsTable;
