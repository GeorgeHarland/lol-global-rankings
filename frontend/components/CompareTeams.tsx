const CompareTeams = () => {
  const TableRow = ({
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
        <th className="px-6 py-4 text-sm leading-5 font-medium text-gray-900">
          {statName}
        </th>
        <td className="px-6 py-4 text-sm leading-5 text-gray-900">{teamOne}</td>
        <td className="px-6 py-4 text-sm leading-5 text-gray-900">{teamTwo}</td>
      </tr>
    );
  };

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          <th></th>
          <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            TEAM 1
          </th>
          <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            TEAM 2
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        <TableRow statName="Average Kills" teamOne="5" teamTwo="6" />
        <TableRow statName="Average Deaths" teamOne="5" teamTwo="6" />
        <TableRow statName="Average Inhibs" teamOne="5" teamTwo="6" />
        <TableRow statName="Total Wins" teamOne="5" teamTwo="6" />
        <TableRow statName="Total Losses" teamOne="5" teamTwo="6" />
        <TableRow statName="Tournaments Won" teamOne="5" teamTwo="6" />
        <TableRow statName="Average Kills" teamOne="5" teamTwo="6" />
      </tbody>
    </table>
  );
};

export default CompareTeams;
