# DNS Lookup Plugin

This will allow you to do a DNS lookup for any Domain, and will provide you with a JSON output.

* Requires: `awk` `jq` & `dig` installed.
* Only works on Linux

Example Output
```console
user@DESKTOP:/mnt/e/Github/dns_lookup_plugin$ node test.js 
[ { Name: 'divine.games.',
    TTL: '0',
    Class: 'IN',
    Type: 'TXT',
    IpAddress: '"heritage=external-dns,external-dns/owner=test,external-dns/resource=service/default/nginx"' } ]
```

Install Required Applications
* jq: `sudo apt-get install jq`
* awk: `sudo apt-get install gawk`
* dig: `sudo apt-get install dig`

Notes
* Todo: Make it work on Windows

Regex used for Domain Validation
* Regex: `/(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/`

Supported DNS Record Types:
```js
// #INFO List of DNS Record Types
// #URL https://en.wikipedia.org/wiki/List_of_DNS_record_types

const record_types = [
    //Resource Records
    'a',
    'aaaa',
    'afsdb',
    'apl',
    'caa',
    'cdnskey',
    'cds',
    'cert',
    'cname',
    'csync',
    'dhcid',
    'dlv',
    'dname',
    'dnskey',
    'ds',
    'eui48',
    'eui64',
    'hinfo',
    'hip',
    'ipseckey',
    'key',
    'kx',
    'loc',
    'mx',
    'naptr',
    'ns',
    'nsec',
    'nsec3',
    'nsec3param',
    'openpgpkey',
    'ptr',
    'rrsig',
    'rp',
    'sig',
    'smimea',
    'soa',
    'srv',
    'sshfp',
    'ta',
    'tkey',
    'tlsa',
    'tsig',
    'txt',
    'uri',
    'zonemd',
    'svcb',

    //Pseudo-RRs Record Types
    '*',
    'axfr',
    'ixfr',
    'opt',

    //Obsolete Record Types
    'md',
    'mf',
    'maila',
    'mb',
    'mg',
    'mr',
    'minfo',
    'mailb',
    'wks',
    'nb',
    'nbstat',
    'null',
    'a6',
    'nxt',
    'key',
    'sig',
    'hinfo',
    'rp',
    'x25',
    'isdn',
    'rt',
    'nsap',
    'nsap-ptr',
    'px',
    'eid',
    'nimloc',
    'atma',
    'apl',
    'sink',
    'gpos',
    'uinfo',
    'uid',
    'gid',
    'unspec',
    'spf',
    'ninfo',
    'rkey',
    'talink',
    'nid',
    'l32',
    'l64',
    'lp',
    'doa'
];
```