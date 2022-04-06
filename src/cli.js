#!/usr/bin/env node
doc = `
Usage:
  ethscan (abi | byte | code) <address> [options]
  ethscan -h | --help | --version

Options:
 -h --help            Show this screen.
 -v, --version        Show version.
 -o, --output=<file>  Write to output file
 -d, --debug          Print debug logs
`;
const { docopt } = require("docopt");
const { API } = require("./etherscan");
const fs = require("fs");
const { version } = require("../package.json");
require("dotenv").config();

const arguments = docopt(doc, {
  version: version,
});

console.log(arguments);

const apiKey = process.env.ETHERSCAN;

function exitError(error) {
  console.error(error);
  process.exit(1);
}

function log(message) {
  if (arguments["--debug"]) console.warn(message);
}

if (arguments["--version"]) {
  console.log(version);
  process.exit(0);
}

if (!apiKey) {
  log(`
  No API key found for etherscan. This will reduce the amout of requests
  that can be made. Make sure to set the environment variable 'ETHERSCAN=API_KEY'

  Read more about etherscan api keys here:
  https://docs.etherscan.io/
  `);
}

const address = arguments["<address>"];

if (!address) {
  exitError("No address provided!");
}

const api = API(apiKey);
let action = null;
if (arguments.abi) {
  action = api.getAbi(address);
} else if (arguments.byte) {
  action = api.getByteCode(address);
} else if (arguments.code) {
  action = api.getCode(address);
} else {
  exitError(`No valid actions found in ${JSON.stringify(arguments)}`);
}

action
  .then((r) => {
    const output = arguments["--output"];
    if (output) {
      fs.writeFileSync(output, JSON.stringify(r));
    } else {
      console.log(r);
    }
  })
  .then(() => process.exit(0))
  .catch(exitError);
