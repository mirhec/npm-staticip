var wait = require('wait.for');
var cli = require('cli');
var setip = require('./setip');
var generate = require('./generate');

cli.parse(null, {
    setip: 'Set the ip addresses as configured in ipmapping.json', 
    generate: 'Generate an initial ipmapping.json file with the current ip configuration.'
});

if(cli.command == 'setip') {
    wait.launchFiber(setip);
} else if(cli.command == 'generate') {
    wait.launchFiber(generate);
}
