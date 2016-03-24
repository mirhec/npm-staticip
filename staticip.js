var wait = require('wait.for');
var cli = require('cli');
var setip = require('./commands/setip');
var generate = require('./commands/generate');
var print = require('./commands/print');
var waitForMac = require('./commands/waitformac.js');

cli.parse({
    mac: ['m', 'Mac address to use for some commands, e.g. waitformac', 'string'],
    timeout: ['t', 'Sets the timeout in milliseconds for the "waitformac" command (defaults to 10 seconds).', 'number', 10000],
    ip: ['i', 'Ip address to set for the corresponding mac address (command setip).', 'ip'],
    verbose: ['v', 'If this switch is enabled, some commands provide more output.'],
}, {
    setip: 'Set the ip addresses as configured in ipmapping.json. If you want to set only a single mac address you need to set the parameters --mac and --ip.', 
    generate: 'Generate an initial ipmapping.json file with the current ip configuration.',
    print: 'Prints the mac addresses of all found network interfaces.',
    waitformac: 'Waits for mac address. The mac address needs to be specified with --mac parameter.'
});

// cli.enable('timeout');
cli.enable('status');

cli.main(function(args, options) {
    if(cli.command === 'generate') {
        wait.launchFiber(generate, options);
    } else if(cli.command === 'print') {
        wait.launchFiber(print, options);
    } else if(cli.command === 'setip') {
        wait.launchFiber(setip, options);
    } else if(cli.command === 'waitformac') {
        wait.launchFiber(waitForMac, options);
    }
});
