export type ScanHost = {
  ip: string;
  hostname?: string;
  os?: string;
  mac?: string;
  vendor?: string;
  openPorts: {
    port: string;
    service?: string;
    version?: string;
  }[];
};

export type ScanData = ScanHost[];