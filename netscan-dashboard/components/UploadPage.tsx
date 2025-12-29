// /components/UploadPage.tsx
'use client';

import { useState } from 'react';
import { useScanData } from '@/lib/context/ScanContext';
import { parseNmapXML } from '@/lib/utils/xmlParser';
import { Upload } from 'lucide-react';

export default function UploadPage() {
  const { setScanData } = useScanData();
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      setStatus('Please select a file');
      return;
    }

    setLoading(true);
    setStatus('Parsing XML...');

    try {
      const text = await file.text();
      const hosts = parseNmapXML(text);
      
      setScanData(hosts);
      setStatus(`Successfully loaded ${hosts.length} host(s) with ${hosts.reduce((acc, h) => acc + h.openPorts.length, 0)} open port(s)`);
    } catch (err) {
      setStatus(` Error parsing XML: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
        <div className="flex items-center gap-3 mb-6">
          <Upload className="text-teal-400" size={32} />
          <h2 className="text-2xl font-bold text-white">Upload Nmap XML</h2>
        </div>
        
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
            <input
              type="file"
              accept=".xml"
              onChange={(e) => {
                setFile(e.target.files?.[0] || null);
                setStatus('');
              }}
              className="hidden"
              id="file-upload"
            />
            <label 
              htmlFor="file-upload"
              className="cursor-pointer"
            >
              <div className="text-gray-400 mb-2">
                {file ? (
                  <span className="text-teal-400">{file.name}</span>
                ) : (
                  'Click to select an Nmap XML file'
                )}
              </div>
              <div className="text-sm text-gray-500">
                Supports .xml files from nmap -oX output
              </div>
            </label>
          </div>

          <button
            onClick={handleUpload}
            disabled={!file || loading}
            className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            {loading ? 'Parsing...' : 'Parse and Load'}
          </button>

          {status && (
            <div className={`p-4 rounded-lg ${
              status.includes('❌') 
                ? 'bg-red-900/20 border border-red-700 text-red-400' 
                : status.includes('✅')
                ? 'bg-teal-900/20 border border-teal-700 text-teal-400'
                : 'bg-gray-700 text-gray-300'
            }`}>
              {status}
            </div>
          )}

          <div className="mt-6 p-4 bg-gray-900 rounded-lg">
            <h3 className="text-white font-semibold mb-2">How to generate an XML scan:</h3>
            <code className="text-sm text-gray-300 block">
              nmap -sV -oX output.xml 192.168.1.1
            </code>
            <p className="text-xs text-gray-500 mt-2">
              This scans the target and saves results in XML format
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}