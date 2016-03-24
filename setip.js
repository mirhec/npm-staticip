var wait = require('wait.for');
var macaddress = require('macaddress');
var exec = require('child_process').exec;
var fs = require('fs');

var mapping = {};
if (fs.existsSync('./ipmapping.json')) {
    mapping = JSON.parse(fs.readFileSync('./ipmapping.json'));
}

module.exports = function force() {
    var addresses = wait.for(macaddress.all);
    for (var adr in addresses) {
        var mac = addresses[adr].mac;
        console.log('set ip for %s (%s):', adr, mac);
        var ip = mapping[mac];
        if (ip !== undefined && ip != '') {
            var result = wait.for(exec, 'netsh int ipv4 set address name="' + adr + '" source=static address=' + ip + ' mask=255.255.255.0');
            console.log('  -> %s', ip);
        } else {
            console.log('  -> no ip configured!');
        }
    }
}