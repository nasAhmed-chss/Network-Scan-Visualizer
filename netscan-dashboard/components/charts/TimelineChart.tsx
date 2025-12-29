'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const mockData = [
  { time: '04/27 00:00', open_ports: 15, total_hosts: 7 },
  { time: '04/28 00:00', open_ports: 17, total_hosts: 7 },
  { time: '04/29 00:00', open_ports: 17, total_hosts: 7 }
];

export default function TimelineChart() {
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h3 className="text-white font-semibold mb-4">Live Hosts and Open Ports over Time</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={mockData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="time" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="open_ports" stroke="#14b8a6" strokeWidth={2} />
          <Line type="monotone" dataKey="total_hosts" stroke="#0891b2" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}