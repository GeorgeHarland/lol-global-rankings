const SearchResult = ({
  teamName,
  ResultOnClick,
}: {
  teamName: string;
  ResultOnClick: Function;
}) => {
  return (
    <div
      className="hover:underline hover:cursor-pointer hover:font-bold"
      onClick={() => ResultOnClick()}
    >
      {teamName}
    </div>
  );
};

export default SearchResult;
