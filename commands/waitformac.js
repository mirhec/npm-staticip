var wait = require('wait.for');
var macaddress = require('macaddress');
var cli = require('cli');
var sleep = require('sleep');

module.exports = function(options) {
    if(options.mac == null) {
        cli.error('You need to specify a mac address to wait for!');
        return;
    }
    var start = new Date().getTime();
    var found = false;
    while(true) {
        var addresses = wait.for(macaddress.all);
        for (var adr in addresses) {
            var mac = addresses[adr].mac;
            if(mac === options.mac) {
                found = true;
                break;
            }
        }
        if(found === true)
            break;
        
        var now = new Date().getTime();
        if(now - start > options.timeout) break;
        
        sleep.usleep(100000);
    }
    
    if(!found) {
        cli.error('Could not find mac address ' + options.mac);
    }
}