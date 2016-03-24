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
    
    // Set all ip addresses to dhcp in a first step
    for (var adr in addresses) {
        var mac = addresses[adr].mac;
        var ip = mapping[mac];
        if (ip !== undefined && ip != '') {
            console.log('set dhcp for %s (%s):', adr, mac);
            var result = wait.for(exec, 'netsh int ipv4 set address name="' + adr + '" dhcp');
        }
    }
    
    // Set the static ip addresses
    for (var adr in addresses) {
        var mac = addresses[adr].mac;
        var ip = mapping[mac];
        if (ip !== undefined && ip != '') {
            console.log('set ip for %s (%s):', adr, mac);
            var result = wait.for(exec, 'netsh int ipv4 set address name="' + adr + '" source=static address=' + ip + ' mask=255.255.255.0');
            console.log('  -> %s', ip);
        }
    }
}