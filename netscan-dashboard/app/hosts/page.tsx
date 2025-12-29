import HostsPage from '@/components/HostsPage';
import Sidebar from '@/components/Sidebar';

export default function Hosts() {
  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      <main className="flex-1 p-8">
        <HostsPage />
      </main>
    </div>
  );
}