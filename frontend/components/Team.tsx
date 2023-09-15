import Link from 'next/link';

const Team = () => (
  <div>
    <div className="border-2 rounded-lg border-black p-4">
      <h2 className="text-center font-bold text-lg">T1</h2>
      <h3>Global Rank: 3</h3>
      <h4>Championship Rating: 1039</h4>
      <h4>Player Rating: 1599</h4>
      <h4>Longevity: 1900</h4>
    </div>
    <div>
      <h2>Current Roster</h2>
      <Link href="#">Zeus</Link>
      <Link href="#">Oner</Link>
      <Link href="#">Faker</Link>
      <Link href="#">Gumayusi</Link>
      <Link href="#">Keria</Link>
    </div>
  </div>
);

export default Team;
