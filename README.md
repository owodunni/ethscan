# Ethscan
[![CodeFactor](https://www.codefactor.io/repository/github/owodunni/ethscan/badge)](https://www.codefactor.io/repository/github/owodunni/ethscan)[![Build](https://github.com/owodunni/ethscan/actions/workflows/build.yml/badge.svg)](https://github.com/owodunni/ethscan/actions/workflows/build.yml)[![npm version](https://badge.fury.io/js/@owodunni%2Fethscan.svg)](https://badge.fury.io/js/@owodunni%2Fethscan)[![License](https://img.shields.io/github/license/owodunni/ethscan)](https://github.com/owodunni/ethscan/blob/main/LICENSE)[![codecov](https://codecov.io/gh/owodunni/ethscan/branch/main/graph/badge.svg?token=YIFCXZXJ7I)](https://codecov.io/gh/owodunni/ethscan)

A simple CLI for querying contract information from block-explorers.

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
These can also be set by the cli. There are predefined block-explorers for **Polygon**, **Ethereum**, **Fantom**, **BSC**.

## Usage

```yaml
ethscan -h
```
```yaml
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
```

**Output contract ABI:**
```yaml
ethscan abi 0xD33526068D116cE69F19A9ee46F0bd304F21A51f -chain ethereum
```
```yaml
[
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

**Save contract code:**
```yaml
ethscan code 0xD33526068D116cE69F19A9ee46F0bd304F21A51f -o ~/code
```
```
    ~/code  tree .
.
├── contracts
│   ├── contract
│   │   ├── RocketBase.sol
│   │   └── token
│   │       └── RocketTokenRPL.sol
│   └── interface
│       ├── dao
│       │   └── protocol
│       │       └── settings
│       │           └── RocketDAOProtocolSettingsInflationInterface.sol
│       ├── RocketStorageInterface.sol
│       ├── RocketVaultInterface.sol
│       └── token
│           └── RocketTokenRPLInterface.sol
└── @openzeppelin
    └── contracts
        ├── math
        │   └── SafeMath.sol
        ├── token
        │   └── ERC20
        │       ├── ERC20Burnable.sol
        │       ├── ERC20.sol
        │       └── IERC20.sol
        └── utils
            └── Context.sol

14 directories, 11 files

```
**Output contract code:**
```yaml
ethscan code 0xD33526068D116cE69F19A9ee46F0bd304F21A51f
```

```yaml
[
...
{
    content: '/**\n' +
      '  *       .\n' +
      '  *      / \\\n' +
      "  *     |.'.|\n" +
      "  *     |'.'|\n" +
      "  *   ,'|   |`.\n" +
      "  *  |,-'-|-'-.|\n" +
      '  *   __|_| |         _        _      _____           _\n' +
      '  *  | ___ \\|        | |      | |    | ___ \\         | |\n' +
      '  *  | |_/ /|__   ___| | _____| |_   | |_/ /__   ___ | |\n' +
      '  *  |    // _ \\ / __| |/ / _ \\ __|  |  __/ _ \\ / _ \\| |\n' +
      '  *  | |\\ \\ (_) | (__|   <  __/ |_   | | | (_) | (_) | |\n' +
      '  *  \\_| \\_\\___/ \\___|_|\\_\\___|\\__|  \\_|  \\___/ \\___/|_|\n' +
      '  * +---------------------------------------------------+\n' +
      '  * |    DECENTRALISED STAKING PROTOCOL FOR ETHEREUM    |\n' +
      '  * +---------------------------------------------------+\n' +
  ...
      'interface RocketTokenRPLInterface is IERC20 {\n' +
      '    function getInflationCalcTime() external view returns(uint256);\n' +
      '    function getInflationIntervalTime() external view returns(uint256);\n' +
  ...
      '}\n',
    path: '/contracts/interface/token/RocketTokenRPLInterface.sol'
  }
]

```

## Development

For local development linking the package is useful. This enables us to use a development version of `ethscan`
instead of fetching from npm.

```bash
npm link
```

## Contribution
Contributions are welcome! Leave an issue or send an email.

Don't forget to format the code:
```bash
npm run fix
```
