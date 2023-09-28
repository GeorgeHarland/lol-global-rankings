import { RankingType } from '@/types/types';
import SearchResult from './SearchResult';

// CURRENTLY ONLY USED IN SingleTeamSearch
// IDK HOW TO GET IT TO WORK WITH QuickCompare RESULT FUNCTION

type SearchResultProps = {
  results: RankingType[];
  resultFunction: Function;
};
const SearchResultContainer = ({
  results,
  resultFunction,
}: SearchResultProps) => {
  return (
    <div className="bg-gray-400 shadow-inner text-white max-h-96 overflow-y-scroll">
      {results.map((result, i) => (
        <SearchResult
          teamName={result.team_name}
          ResultOnClick={() => resultFunction(result.team_name, result.team_id)}
          key={i}
        />
      ))}
    </div>
  );
};

export default SearchResultContainer;
