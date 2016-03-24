# Static Ip
Windows Cli Helper to set static ip addresses for network interfaces based on mac address.

This tool is used to set static ip addresses for NIC on windows based on its mac address.
Sometimes it occurs (especially if you are using multiple USB3 to GigE adapter) that windows
renames the network interface or recognizes it as a new one. In this case the ip address may
be deleted. In order to set the ip addresses based on mac address you can use this tool.

To install this tool, just run

```
npm install -g staticip
```

Afterwards you can use the tool to create an ip mapping file of your current ip configuration:

```
staticip generate
```

You will end up with a new file **ipmapping.json**, structured like this:

```json
{
    "08:00:27:10:94:dc": "192.168.178.252",
    //...
}
```

Now you can edit this file and change it to your needs. Afterwards run

```
staticip setip
```

to set the ip addresses to the specified network interfaces.