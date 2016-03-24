var wait = require('wait.for');
var macaddress = require('macaddress');
var fs = require('fs');

module.exports = function generate() {
    console.log('generate ...');
    var addresses = wait.for(macaddress.all);
    var obj = {};
    for (var adr in addresses) {
        var mac = addresses[adr].mac;
        var ip = addresses[adr].ipv4;
        obj[mac] = ip;
    }
    console.log(JSON.stringify(obj, null, 4));
    var result = wait.for(fs.writeFile, './ipmapping.json', JSON.stringify(obj, null, 4));
}