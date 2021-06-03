var dns_lookup = require('./index.js');


var domain = "divine.games";
var type = "txt";

dns_lookup(domain,type).then((data) => {
    console.log(data);
}).catch((err) => {
    console.error(err);
})