import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center">
      <h1 className="text-xl font-bold">STARS LEAGUE</h1>
      <div className="space-x-4">
        <Link href="/dashboard" className="hover:text-yellow-400">Dashboard</Link>
        <Link href="/ranking" className="hover:text-yellow-400">Ranking</Link>
        <Link href="/admin" className="hover:text-yellow-400">Admin</Link>
      </div>
    </nav>
  );
}
