import { TeamInfo } from '@/types/types';
import SearchResult from './SearchResult';

// CURRENTLY ONLY USED IN SingleTeamSearch
// IDK HOW TO GET IT TO WORK WITH QuickCompare RESULT FUNCTION

type SearchResultProps = {
  results: TeamInfo[];
  resultFunction: Function;
};
const SearchResultContainer = ({
  results,
  resultFunction,
}: SearchResultProps) => {
  return (
    <div className="bg-gray-400 shadow-inner text-white">
      {results.map((result) => (
        <SearchResult
          teamName={result.name}
          ResultOnClick={() => resultFunction(result.name)}
        />
      ))}
    </div>
  );
};

export default SearchResultContainer;
