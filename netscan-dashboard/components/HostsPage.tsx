'use client';

import { useScanData } from '@/lib/context/ScanContext';
import { PLACEHOLDER_DATA } from '@/lib/utils/xmlParser';
import { Server } from 'lucide-react';

export default function HostsPage() {
  const { scanData } = useScanData();
  const hosts = scanData || PLACEHOLDER_DATA;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Server className="text-teal-400" size={32} />
        <h2 className="text-2xl font-bold text-white">All Hosts</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hosts.map((host, idx) => (
          <div key={idx} className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-teal-600 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-teal-400">{host.ip}</h3>
              <div className="bg-teal-900/30 text-teal-400 px-3 py-1 rounded-full text-sm font-semibold">
                {host.openPorts.length} ports
              </div>
            </div>
            
            {host.hostname && (
              <p className="text-gray-400 text-sm mb-2">
                <span className="text-gray-500">Hostname:</span> {host.hostname}
              </p>
            )}
            
            {host.vendor && (
              <p className="text-gray-400 text-sm mb-2">
                <span className="text-gray-500">Vendor:</span> {host.vendor}
              </p>
            )}
            
            {host.os && (
              <p className="text-gray-400 text-sm mb-4">
                <span className="text-gray-500">OS:</span> {host.os}
              </p>
            )}
            
            <div className="space-y-2">
              <p className="text-gray-300 font-semibold text-sm">Open Ports:</p>
              <div className="flex flex-wrap gap-2">
                {host.openPorts.map((port, pidx) => (
                  <span
                    key={pidx}
                    className="bg-gray-700 hover:bg-gray-600 text-gray-300 px-2 py-1 rounded text-xs transition-colors cursor-default"
                    title={port.version || port.service}
                  >
                    {port.port}
                    {port.service && <span className="text-gray-500 ml-1">({port.service})</span>}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}