interface ServicesTableProps {
  services: { name: string; count: number }[];
}

export default function ServicesTable({ services }: ServicesTableProps) {
  const maxCount = services[0]?.count || 1;

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h3 className="text-white font-semibold mb-4">Identified Services</h3>
      <div className="space-y-2">
        <div className="flex text-gray-400 text-sm border-b border-gray-700 pb-2">
          <span className="flex-1">service_info</span>
          <span className="w-20 text-right">count ↓</span>
        </div>
        {services.map((s, idx) => (
          <div key={idx} className="flex items-center text-sm">
            <span className="flex-1 text-gray-300 truncate">{s.name}</span>
            <span className="w-20 text-right">
              <div className="flex items-center justify-end gap-2">
                <div className="flex-1 bg-gray-700 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-teal-500 h-full" 
                    style={{ width: `${(s.count / maxCount) * 100}%` }}
                  ></div>
                </div>
                <span className="text-gray-400 w-6 text-right">{s.count}</span>
              </div>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}