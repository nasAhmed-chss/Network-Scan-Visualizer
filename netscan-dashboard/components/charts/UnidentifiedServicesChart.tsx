// /components/charts/UnidentifiedServicesChart.tsx
'use client';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface UnidentifiedServicesChartProps {
  data: { port: string; count: number }[];
}

const COLORS = [
  '#14b8a6', '#0d9488', '#0f766e', '#115e59', 
  '#134e4a', '#0e7490', '#0891b2', '#06b6d4'
];

export default function UnidentifiedServicesChart({ data }: UnidentifiedServicesChartProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h3 className="text-white font-semibold mb-4">Unidentified Services (open port)</h3>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            dataKey="count"
            label={({ payload }) => payload.port}
            labelLine={true}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center">
            <div 
              className="w-2 h-2 rounded-full mr-1" 
              style={{ backgroundColor: COLORS[idx % COLORS.length] }}
            ></div>
            <span className="text-gray-400">{item.port}</span>
          </div>
        ))}
      </div>
    </div>
  );
}