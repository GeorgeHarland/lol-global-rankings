'use client'

import { useSearchParams } from 'next/navigation';
import CompareTeamsTable from '@/components/CompareTeamsTable';
import QuickCompare from '@/components/QuickCompare';

const CompareTeams = () => {
  const searchParams = useSearchParams();
  const teamsParam = searchParams.getAll('teams');

  return (
    <>
      {teamsParam && teamsParam.length > 0 ? <CompareTeamsTable /> : <div className="w-1/4 mx-auto flex flex-col gap-4"><QuickCompare /></div>}
    </>
  );
};

export default CompareTeams;
