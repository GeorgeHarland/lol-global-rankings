import { TournamentInfo } from '@/types/types';
import { useState } from 'react';

type DropdownProps = {
  title: string;
  content: TournamentInfo[] | undefined;
};

const DropdownItemTournament = ({ title, content }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="mb-4">
      <h2
        className="cursor-pointer hover:underline font-bold text-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
      </h2>
      {isOpen && (
        <div className="ml-4">
          {content ? (
            content.map((item, index) => <div key={index}>{item.name}</div>)
          ) : (
            <div>No Tournaments Found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default DropdownItemTournament;
