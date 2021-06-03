var dns = require('./index.js');


var domain = "divine.games";
var type = "txt";

dns.lookup(domain,type).then((data) => {
    console.log(data);
}).catch((err) => {
    console.error(err);
})