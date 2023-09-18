'use client';
import { usePathname, useSearchParams } from 'next/navigation';
import Dropdown from './Dropdown';
import Team from './Team';

// ADD TS PROP
const TeamProfileContainer = (teamdata: any) => {
  const pathName = usePathname().substring(1).toUpperCase();
  return (
    <div className="m-4">
      <div className="flex gap-6  ">
        <Team
          teamName={pathName}
          globalRank={3}
          championshipRating={1039}
          playerRating={1599}
          longevity={1900}
        />
        <Dropdown />
      </div>
    </div>
  );
};

export default TeamProfileContainer;
