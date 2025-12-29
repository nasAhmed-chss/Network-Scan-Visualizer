'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { ScanData } from '@/types/scan';

interface ScanContextType {
  scanData: ScanData | null;
  setScanData: (data: ScanData | null) => void;
  isPlaceholder: boolean;
}

const ScanContext = createContext<ScanContextType>({
  scanData: null,
  setScanData: () => {},
  isPlaceholder: true,
});

export const useScanData = () => useContext(ScanContext);

export function ScanProvider({ children }: { children: ReactNode }) {
  const [scanData, setScanData] = useState<ScanData | null>(null);
  const isPlaceholder = scanData === null;

  return (
    <ScanContext.Provider value={{ scanData, setScanData, isPlaceholder }}>
      {children}
    </ScanContext.Provider>
  );
}