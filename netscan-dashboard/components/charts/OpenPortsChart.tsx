'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

interface OpenPortsChartProps {
  data: { port: number; count: number }[];
}

export default function OpenPortsChart({ data }: OpenPortsChartProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h3 className="text-white font-semibold mb-4">Open Ports Found</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="port" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Bar dataKey="count" fill="#14b8a6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}