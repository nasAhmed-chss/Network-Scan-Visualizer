import { ScanData } from '@/types/scan';

export function parseNmapXML(xmlText: string): ScanData {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

  const hosts = Array.from(xmlDoc.querySelectorAll('host')).map(host => {
    const ipAddr =
      host.querySelector('address[addrtype="ipv4"]')?.getAttribute('addr') || '';

    const hostname =
      host.querySelector('hostname')?.getAttribute('name') || undefined;

    const macAddr =
      host.querySelector('address[addrtype="mac"]')?.getAttribute('addr') || undefined;

    const vendor =
      host.querySelector('address[addrtype="mac"]')?.getAttribute('vendor') || undefined;

    // ✅ FIX: OS parsed ONCE per host
    const os =
      host.querySelector('os > osmatch')?.getAttribute('name') ??
      host.querySelector('os > osmatch > osclass')?.getAttribute('osfamily') ??
      'Unknown';

    const ports = Array.from(host.querySelectorAll('port[protocol="tcp"]'))
      .map(portEl => {
        const portId = portEl.getAttribute('portid') || '';
        const state = portEl.querySelector('state')?.getAttribute('state');
        const service = portEl.querySelector('service');

        if (state !== 'open') return null;

        return {
          port: portId,
          service: service?.getAttribute('name') || undefined,
          version: service?.getAttribute('product') || undefined,
        };
      })
      .filter((p): p is NonNullable<typeof p> => p !== null);

    return {
      ip: ipAddr,
      hostname,
      mac: macAddr,
      vendor,
      os,           
      openPorts: ports,
    };
  });

  return hosts;
}


export const PLACEHOLDER_DATA: ScanData = [
  {
    ip: '10.11.196',
    openPorts: [{ port: '80', service: 'http' }, { port: '443', service: 'https' }]
  },
  {
    ip: '65.61.137.117',
    hostname: 'demo.testfire.net',
    os: 'Linux',
    openPorts: [
      { port: '80', service: 'http', version: 'Apache httpd 2.4.7' },
      { port: '443', service: 'https' },
      { port: '8080', service: 'http-proxy' }
    ]
  },
  {
    ip: '172.104.213.248',
    hostname: 'dnsdumpster.com',
    os: 'Linux',
    openPorts: [
      { port: '443', service: 'https' },
      { port: '80', service: 'http', version: 'nginx 1.19.0' }
    ]
  },
  {
    ip: '104.26.8.237',
    hostname: 'hackertarget.com',
    os: 'Unknown',
    openPorts: [
      { port: '443', service: 'https' },
      { port: '80', service: 'http' },
      { port: '8443', service: 'https-alt' },
      { port: '3000', service: 'http' }
    ]
  },
  {
    ip: '45.33.32.156',
    hostname: 'scanme.nmap.org',
    os: 'Linux',
    openPorts: [
      { port: '22', service: 'ssh', version: 'OpenSSH 8.9p1 Ubuntu' },
      { port: '80', service: 'http', version: 'Apache Tomcat/Coyote JSP engine 1.1' },
      { port: '9929', service: 'nping-echo' },
      { port: '31337', service: 'Elite' }
    ]
  },
  {
    ip: '44.228.249.3',
    hostname: 'testasp.vulnweb.com',
    os: 'Windows',
    openPorts: [{ port: '80', service: 'http', version: 'Microsoft IIS httpd 8.5' }]
  }
];