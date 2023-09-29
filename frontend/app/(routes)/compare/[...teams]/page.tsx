import CompareTeamsTable from '@/components/CompareTeamsTable';
import Link from 'next/link';

const CompareTablePage = ({ params }: { params: { teams: string[] } }) => (
  <div>
    <Link
      href="/compare"
      className="hover:font-bold hover:underline text-blue-700"
    >
      Go Back
    </Link>
    <CompareTeamsTable
      teamOneName={params.teams[0]}
      teamTwoName={params.teams[1]}
    />
  </div>
);

export default CompareTablePage;
