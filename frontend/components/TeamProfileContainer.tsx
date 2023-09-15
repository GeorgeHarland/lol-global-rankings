import Dropdown from './Dropdown';
import Team from './Team';

const TeamProfileContainer = () => (
  <div className="m-4">
    <div className="flex gap-6  ">
      <Team />
      <Dropdown />
    </div>
  </div>
);

export default TeamProfileContainer;
