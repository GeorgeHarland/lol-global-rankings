import { TournamentInfo } from '@/types/types';
import DropdownItemTournament from './DropdownItemTournament';

type TournamentProps = {
  content: TournamentInfo[] | undefined;
};

const TeamDropdown = ({ content }: TournamentProps) => {
  return (
    <div>
      <DropdownItemTournament title="Tournaments:" content={content} />
      {/* <DropdownItem title="Dropdown 2" content="Content for Dropdown 2" />
      <DropdownItem title="Dropdown 3" content="Content for Dropdown 3" />
      <DropdownItem title="Dropdown 4" content="Content for Dropdown 4" />
      <DropdownItem title="Dropdown 5" content="Content for Dropdown 5" /> */}
    </div>
  );
};

export default TeamDropdown;
