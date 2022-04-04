const arp = require('@network-utils/arp-lookup');
const net = require('net');
const oui = require('oui');
const ping = require('ping');
const os = require('os')

const lookupMacAddress = async (ipaddress) => {
    if (!net.isIP(ipaddress)) return {};

  const mac = await arp.toMAC(ipaddress);

  try {
    if(typeof mac === 'string') {
        const lookup = oui(mac);

        if (lookup) {
        return { mac, name: lookup.split('\n')[0] };
        }
    } else {
        return { mac: null, name: null};
    }
  } catch (e) {
    console.log(e);
  }

  return { mac };
};

const checkIpAndPrintInfo = async (ipaddress) => {
  if (!net.isIP(ipaddress)) return;

  try {
    const res = await ping.promise.probe(ipaddress);

    if (res.alive) {
      return Object.assign({}, { ip: ipaddress }, await lookupMacAddress(ipaddress));
    }
  } catch (e) {
    console.log(e);
  }
};

const localIps = async (ipAddress) => {
  const addressBlock = ipAddress.substring(0, ipAddress.lastIndexOf('.'));

  const ipBlock = [...Array(254).keys()];

  const hosts = await Promise.all(ipBlock.map(async (i) => {
      return checkIpAndPrintInfo(`${addressBlock}.${i + 1}`)
      }));

  return hosts.filter(Boolean);
};

const localIpsBatch = async (ipAddresses, name = "") => {
    const addressBlocks = ipAddresses.map(ipAddress => ipAddress.substring(0, ipAddress.lastIndexOf('.')));
  
    //const ipBlock = [...Array(254).keys()];

    let ipBlock = [] 

    addressBlocks.map((addressBlock) => {
        let subBlock = [...Array(254).keys()]
        subBlock.map(i => {
            ipBlock.push(`${addressBlock}.${i}`)
        })
    })

    const hosts = await Promise.all(ipBlock.map(async (i) => {
        return checkIpAndPrintInfo(`${i}`)
    }));
  
    if(name !== "")
      return hosts.filter(Boolean).filter((host) => host.mac !== null && host.name === name)
    else
      return hosts.filter(Boolean).filter((host) => host.mac !== null);
  };

const getPrivateIps = () => {
    const nets = os.networkInterfaces();
    const results = Object.create(null); // Or just '{}', an empty object

    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
            if (net.family === 'IPv4' && !net.internal) {
                if (!results[name]) {
                    results[name] = [];
                }
                results[name].push(net.address);
            }
        }
    }

    let plainResult = []

    Object.keys(results).map(key => {
        results[key].map(ip => {
            plainResult.push(ip)
        })
    })

    return plainResult
}

module.exports = { localIps, lookupMacAddress, checkIpAndPrintInfo, getPrivateIps, localIpsBatch };