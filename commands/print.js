var wait = require('wait.for');
var macaddress = require('macaddress');

module.exports = function print(options) {
    var addresses = wait.for(macaddress.all);
    var obj = {};
    for (var adr in addresses) {
        var mac = addresses[adr].mac;
        var ip = addresses[adr].ipv4;
        if(options.verbose)
            console.log('Name: %s, Mac: %s, Ip: %s', adr, mac, ip);
        else
            console.log(mac);
    }
}