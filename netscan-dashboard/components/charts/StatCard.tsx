import React from 'react';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
}

export default function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-2">
        <p className="text-gray-400 text-sm">{title}</p>
        <div className="text-teal-400">{icon}</div>
      </div>
      <p className="text-4xl font-bold text-teal-400">{value}</p>
    </div>
  );
}