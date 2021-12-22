#!/usr/bin/env node

const cli = require('../lib/cli');
const LiveReloader = require('../lib/alive-node')

const options = cli.parse(process.argv);

const reloader = new LiveReloader();

reloader.start(options);
