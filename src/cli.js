#!/usr/bin/env node
doc = `
Usage:
  ethscan (abi | code) <address> [options]
  ethscan -h | --help | --version

Options:
  -o, --output=<file>    Write to output file.
  -k, --api=<key>        API key
  -u, --url=<url>        Block-explorer url
  -c, --chain=<name>     Use predefined chain block-explorer
  -h --help              Show this screen.
  -v, --version          Show version.
  -d, --debug            Print debug logs.

Example:
  $ ethscan abi 0xD33526068D116cE69F19A9ee46F0bd304F21A51f
  $ ethscan code 0xD33526068D116cE69F19A9ee46F0bd304F21A51f -o ./code
  $ ethscan code 0xD33526068D116cE69F19A9ee46F0bd304F21A51f -c polygon
`;
const { docopt } = require("docopt");
const { API } = require("./etherscan");
const fs = require("fs");
const { version } = require("../package.json");
const { saver } = require("./saver");
const { blockExplorer } = require("./explorers");
require("dotenv").config();

const arguments = docopt(doc, {
  version: version,
});

const apiKey = process.env.ETHSCAN_KEY ?? arguments["--api"];
const apiUrl =
  process.env.ETHSCAN_URL ??
  arguments["--url"] ??
  blockExplorer(arguments["--chain"]);

function exitError(error) {
  console.error(error);
  process.exit(1);
}

const log = (message) => {
  if (arguments["--debug"]) console.warn(message);
};

if (arguments["--version"]) {
  console.log(version);
  process.exit(0);
}

log(arguments);
log(`URL: ${apiUrl}`);

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

const output = arguments["--output"];

const api = API(apiKey, apiUrl);
let action = null;
if (arguments.abi) {
  action = api.getAbi(address).then((r) => {
    const result = JSON.stringify(r, null, 2);
    if (output) {
      fs.writeFileSync(output, result);
    } else {
      console.log(result);
    }
  });
} else if (arguments.code) {
  action = api.getCode(address).then((r) => {
    const sources = saver.format(r.sources);
    if (output) {
      return saver.save(output, sources);
    } else {
      sources.forEach(console.log);
    }
  });
} else {
  exitError(`No valid actions found in ${JSON.stringify(arguments)}`);
}

action.then(() => process.exit(0)).catch(exitError);
