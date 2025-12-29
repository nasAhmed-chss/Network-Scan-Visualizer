import { ScanData } from '@/types/scan';

interface HostsTableProps {
  hosts: ScanData;
}

export default function HostsTable({ hosts }: HostsTableProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h3 className="text-white font-semibold mb-4">Hosts</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-400 border-b border-gray-700">
              <th className="text-left py-2">IP ▼</th>
              <th className="text-left py-2">hostname ▼</th>
              <th className="text-right py-2">ports_tested ▼</th>
              <th className="text-right py-2">ports_open ▼</th>
              <th className="text-right py-2">ports_closed ▼</th>
              <th className="text-right py-2">ports_filtered ▼</th>
            </tr>
          </thead>
          <tbody>
            {hosts.map((host, idx) => (
              <tr key={idx} className="border-b border-gray-700">
                <td className="py-3 text-gray-300">{host.ip}</td>
                <td className="py-3 text-gray-300">{host.hostname || '-'}</td>
                <td className="py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div className="w-24 bg-gray-700 rounded-full h-1.5">
                      <div className="bg-teal-500 h-full" style={{ width: '40%' }}></div>
                    </div>
                    <span className="text-gray-400 w-12 text-right">1000</span>
                  </div>
                </td>
                <td className="py-3 text-right text-gray-400">{host.openPorts.length}</td>
                <td className="py-3 text-right text-gray-400">{1000 - host.openPorts.length}</td>
                <td className="py-3 text-right text-gray-400">0</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}