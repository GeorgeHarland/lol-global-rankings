'use client';
import { getURL } from 'next/dist/shared/lib/utils';
import Link from 'next/link';
import { TeamType } from '@/types/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const Team = ({
  teamName,
  globalRank,
  championshipRating,
  playerRating,
  longevity,
}: TeamType) => {
  return (
    <div>
      <div className="border-2 rounded-lg border-black p-4">
        <h2 className="text-center font-bold text-lg">{teamName}</h2>
        <h4>Global Rank: {globalRank}</h4>
        <h4>Championship Rating: {championshipRating}</h4>
        <h4>Player Rating: {playerRating}</h4>
        <h4>Longevity: {longevity}</h4>
      </div>
      <div>
        <h2 className="text-center font-bold text-lg">Current Roster</h2>
        <ul>
          <li>
            <Link href={`${teamName}/playerName`}>Zeus</Link>
          </li>
          <li>
            <Link href={`${teamName}/playerName`}>Oner</Link>
          </li>
          <li>
            <Link href={`${teamName}/playerName`}>Faker</Link>
          </li>
          <li>
            <Link href={`${teamName}/playerName`}>Gumayusi</Link>
          </li>
          <li>
            <Link href={`${teamName}/playerName`}>Keria</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Team;
