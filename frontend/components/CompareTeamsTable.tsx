const CompareTeamsTable = ({
  teamOneName,
  teamTwoName,
}: {
  teamOneName: string;
  teamTwoName: string;
}) => {
  const StatTableRow = ({
    statName,
    teamOne,
    teamTwo,
  }: {
    statName: string;
    teamOne: string;
    teamTwo: string;
  }) => {
    return (
      <tr>
        <th className="px-6 py-4 text-sm leading-5 font-bold text-gray-900">
          {statName}
        </th>
        <td className="px-6 py-4 text-sm leading-5 text-gray-900">{teamOne}</td>
        <td className="px-6 py-4 text-sm leading-5 text-gray-900">{teamTwo}</td>
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
          <TeamTableHead teamName={teamOneName} />
          <TeamTableHead teamName={teamTwoName} />
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        <StatTableRow statName="Average Kills" teamOne="5" teamTwo="6" />
        <StatTableRow statName="Average Deaths" teamOne="5" teamTwo="6" />
        <StatTableRow statName="Average Inhibs" teamOne="5" teamTwo="6" />
        <StatTableRow statName="Total Wins" teamOne="5" teamTwo="6" />
        <StatTableRow statName="Total Losses" teamOne="5" teamTwo="6" />
        <StatTableRow statName="Tournaments Won" teamOne="5" teamTwo="6" />
        <StatTableRow statName="Average Kills" teamOne="5" teamTwo="6" />
      </tbody>
    </table>
  );
};

export default CompareTeamsTable;
