
const { exec } = require("child_process");

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
    //'*',
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
// dig a divine.games  +nocomments +noquestion +noauthority +noadditional +nostats  | awk '{if (NR>3){print}}'| tr -s '\t' | jq -R 'split("\t") |{Name:.[0],TTL:.[1],Class:.[2],Type:.[3],IpAddress:.[4]}' | jq --slurp .

module.exports.record_types = record_types;

const domain_regex = /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/;

module.exports.domain_regex = domain_regex;


function dns_lookup(domain, type) {
    return new Promise((res, rej) => {

        if (process.platform === "win32") {
            return rej("This Plugin is made for Linux, requires dig, awk, jq installed.")
        }

        if (record_types.indexOf(type) == -1) {
            return rej("Invalid Record Type Requested. Please check the current Supported list.")
        }
        if (!domain_regex.test(domain)) {
            return rej("Invalid Domain, please check the domain_regex.")
        }

        const cmdline = `dig ${type} ${domain} +nocomments +noquestion +noauthority +noadditional +nostats  | awk '{if (NR>3){print}}'| tr -s '\t' | jq -R 'split("\t") |{Name:.[0],TTL:.[1],Class:.[2],Type:.[3],IpAddress:.[4]}' | jq --slurp .;`

        exec(cmdline, (error, stdout, stderr) => {
            if (error) {
                return rej(error.message);
            }
            if (stderr) {
                return rej(stderr);
            }
            return res(JSON.parse(stdout));
        });

    });
}

module.exports.lookup = dns_lookup;