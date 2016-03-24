var wait = require('wait.for');
var macaddress = require('macaddress');
var exec = require('child_process').exec;
var fs = require('fs');
var cli = require('cli');

var mapping = {};
if (fs.existsSync('./ipmapping.json')) {
    mapping = JSON.parse(fs.readFileSync('./ipmapping.json'));
}

module.exports = function(options) {
    var addresses = wait.for(macaddress.all);
    
    // Is a single mac and ip address given?
    if(options.mac !== null && options.ip !== null) {
        try {
            var set = false;
            for (var adr in addresses) {
                var mac = addresses[adr].mac;
                if (mac === options.mac) {
                    wait.for(exec, 'netsh int ipv4 set address name="' + adr + '" source=static address=' + options.ip + ' mask=255.255.255.0');
                    cli.ok('set ip for ' + adr + ' (' + mac + ') -> ' + options.ip);
                    set = true;
                    break;
                }
            }
            if(!set) {
                cli.info('Mac address ' + options.mac + ' could not be found!');
            }
        } catch(err) {
            cli.error(err);
        }
    } else {
        try {
            // Set all ip addresses to dhcp in a first step
            for (var adr in addresses) {
                var mac = addresses[adr].mac;
                var ip = mapping[mac];
                if (ip !== undefined && ip !== '') {
                    cli.info('set dhcp for ' + adr + ' (' + mac + ')');
                    var result = wait.for(exec, 'netsh int ipv4 set address name="' + adr + '" dhcp');
                }
            }
            
            // Set the static ip addresses
            for (var adr in addresses) {
                var mac = addresses[adr].mac;
                var ip = mapping[mac];
                if (ip !== undefined && ip !== '') {
                    var result = wait.for(exec, 'netsh int ipv4 set address name="' + adr + '" source=static address=' + ip + ' mask=255.255.255.0');
                    cli.ok('set ip for ' + adr + ' (' + mac + ') -> ' + ip);
                }
            }
        } catch(err) {
            cli.error(err);
        }
    }
}