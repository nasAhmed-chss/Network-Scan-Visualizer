import UploadPage from '@/components/UploadPage';
import Sidebar from '@/components/Sidebar';

export default function Upload() {
  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      <main className="flex-1 p-8">
        <UploadPage />
      </main>
    </div>
  );
}