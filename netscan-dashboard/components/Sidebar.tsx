'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Activity, Upload, Server } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <aside className="w-64 bg-gray-800 border-r border-gray-700 p-6 min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-teal-400">NetScan</h1>
        <p className="text-gray-400 text-sm">Network Visualizer</p>
      </div>
      <nav className="space-y-2">
        <Link
          href="/"
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            isActive('/')
              ? 'bg-teal-900/30 text-teal-400'
              : 'text-gray-400 hover:bg-gray-700'
          }`}
        >
          <Activity size={20} />
          <span>Dashboard</span>
        </Link>
        <Link
          href="/upload"
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            isActive('/upload')
              ? 'bg-teal-900/30 text-teal-400'
              : 'text-gray-400 hover:bg-gray-700'
          }`}
        >
          <Upload size={20} />
          <span>Upload Scan</span>
        </Link>
        <Link
          href="/hosts"
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            isActive('/hosts')
              ? 'bg-teal-900/30 text-teal-400'
              : 'text-gray-400 hover:bg-gray-700'
          }`}
        >
          <Server size={20} />
          <span>Hosts</span>
        </Link>
      </nav>
    </aside>
  );
}