// /components/Dashboard.tsx
'use client';

import { useScanData } from '@/lib/context/ScanContext';
import { PLACEHOLDER_DATA } from '@/lib/utils/xmlParser';
import { ScanData } from '@/types/scan';
import { Activity, Server, Database } from 'lucide-react';
import StatCard from './charts/StatCard';
import OSChart from './charts/OSChart';
import UnidentifiedServicesChart from './charts/UnidentifiedServicesChart';
import ServicesTable from './charts/ServicesTable';
import OpenPortsChart from './charts/OpenPortsChart';
import HostsTable from './charts/HostsTable';
import TimelineChart from './charts/TimelineChart';

function processData(data: ScanData) {
  const hostsUp = data.length;
  const allPorts = data.flatMap(h => h.openPorts);
  const openPorts = allPorts.length;
  const uniquePorts = new Set(allPorts.map(p => p.port)).size;

  // OS distribution
  const osCount: Record<string, number> = {};
  data.forEach(h => {
    const os = h.os || 'Unknown';
    osCount[os] = (osCount[os] || 0) + 1;
  });

  const osData = Object.entries(osCount).map(([name, value]) => ({
    name,
    value,
    percentage: Math.round((value / hostsUp) * 100)
  }));

  // Service counts
  const serviceCount: Record<string, number> = {};
  allPorts.forEach(p => {
    if (p.version) {
      serviceCount[p.version] = (serviceCount[p.version] || 0) + 1;
    } else if (p.service) {
      serviceCount[p.service] = (serviceCount[p.service] || 0) + 1;
    }
  });

  const services = Object.entries(serviceCount)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // Port distribution for the radial chart
  const portCount: Record<string, number> = {};
  allPorts.forEach(p => {
    portCount[p.port] = (portCount[p.port] || 0) + 1;
  });

  const portsData = Object.entries(portCount)
    .map(([port, count]) => ({ port, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  // Port frequency for bar chart
  const portFreq = Object.entries(portCount)
    .map(([port, count]) => ({ port: parseInt(port), count }))
    .sort((a, b) => a.port - b.port)
    .slice(0, 10);

  return {
    hostsUp,
    openPorts,
    uniquePorts,
    osData,
    services,
    portsData,
    portFreq,
    hosts: data
  };
}

export default function Dashboard() {
  const { scanData, isPlaceholder } = useScanData();
  const data = processData(scanData || PLACEHOLDER_DATA);

  return (
    <div className="space-y-6">
      {/* Stat Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Hosts Up" value={data.hostsUp} icon={<Server size={20} />} />
        <StatCard title="Open Ports" value={data.openPorts} icon={<Activity size={20} />} />
        <StatCard title="Unique Ports" value={data.uniquePorts} icon={<Database size={20} />} />
        <StatCard title="Scans" value={isPlaceholder ? 9 : 1} icon={<Activity size={20} />} />
      </div>

      {/* Charts Row - 3 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <OSChart data={data.osData} />
        <UnidentifiedServicesChart data={data.portsData} />
        <ServicesTable services={data.services} />
      </div>

      {/* Bottom Section - 2 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <OpenPortsChart data={data.portFreq} />
        <TimelineChart />
      </div>

      {/* Hosts Table - Full width */}
      <HostsTable hosts={data.hosts} />
    </div>
  );
}