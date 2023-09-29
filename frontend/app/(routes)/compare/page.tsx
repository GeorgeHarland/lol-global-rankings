import CompareTeams from '@/components/CompareTeams';
import QuickCompare from '@/components/QuickCompare';

const compareTeams = () => {
  return (
    <div className="w-1/4 mx-auto flex flex-col gap-4">
      <QuickCompare />
      <CompareTeams />
    </div>
  );
};

export default compareTeams;
