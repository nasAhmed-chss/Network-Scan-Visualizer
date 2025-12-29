import Dashboard from '@/components/Dashboard';
import Sidebar from '@/components/Sidebar';

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      <main className="flex-1 p-8">
        <Dashboard />
      </main>
    </div>
  );
}