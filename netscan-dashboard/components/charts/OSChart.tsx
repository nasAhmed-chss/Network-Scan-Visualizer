'use client';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface OSChartProps {
  data: { name: string; value: number; percentage: number }[];
}

const COLORS = ['#14b8a6', '#0d9488', '#0f766e'];

export default function OSChart({ data }: OSChartProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h3 className="text-white font-semibold mb-4">Operating Systems</h3>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            dataKey="value"
            label={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-4 space-y-2">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center text-sm">
            <div 
              className="w-3 h-3 rounded-full mr-2" 
              style={{ backgroundColor: COLORS[idx % COLORS.length] }}
            ></div>
            <span className="text-gray-300">{item.name}</span>
            <span className="ml-auto text-gray-400">{item.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}