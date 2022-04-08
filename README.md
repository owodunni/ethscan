# Ethscan
[![CodeFactor](https://www.codefactor.io/repository/github/owodunni/ethscan/badge)](https://www.codefactor.io/repository/github/owodunni/ethscan)[![Build](https://github.com/owodunni/ethscan/actions/workflows/build.yml/badge.svg)](https://github.com/owodunni/ethscan/actions/workflows/build.yml)[![npm version](https://badge.fury.io/js/@owodunni%2Fethscan.svg)](https://badge.fury.io/js/@owodunni%2Fethscan)[![License](https://img.shields.io/github/license/owodunni/ethscan)](https://github.com/owodunni/ethscan/blob/main/LICENSE)[![codecov](https://codecov.io/gh/owodunni/ethscan/branch/main/graph/badge.svg?token=YIFCXZXJ7I)](https://codecov.io/gh/owodunni/ethscan)

Ethscan querries information from a Blockexplorer and outputs it in the command
line.

## Install
```
npm install -g @owodunni/ethscan
```
### Configure
By default Ethscan querries [Etherscans api](https://etherscan.io/apis), this
is rate limited to 1Hz. To change Blockexplorer or use an API key the
following environment variables can be set:

```bash
ETHSCAN_KEY='Your api key'
ETHSCAN_URL='https://rinkeby.etherscan.io/api'
```

## Usage

```yaml
Usage:
  ethscan (abi | byte | code) <address> [options]
  ethscan -h | --help | --version

Options:
 -h --help            Show this screen.
 -v, --version        Show version.
 -o, --output=<file>  Write to output file
 -d, --debug          Print debug logs
```

```yaml
Example:
  $ ethscan abi 0xD33526068D116cE69F19A9ee46F0bd304F21A51f
  > [
    {
      "inputs": [
        {
          "internalType": "contract RocketStorageInterface",
          "name": "_rocketStorageAddress",
          "type": "address"
        },
        {
          "internalType": "contract IERC20",
          "name": "_rocketTokenRPLFixedSupplyAddress",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    ...
    ]
```
