require("dotenv").config();
const { API } = require("./etherscan");

const apiKey = process.env.ETHSCAN_KEY;

if (!apiKey) throw "No apiKey for etherscan present.";

const api = API(apiKey);

const someAbi = [
  {
    constant: false,
    inputs: [{ name: "newImplementation", type: "address" }],
    name: "upgradeTo",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  // To not make this file unreadable the rest of the abi was removed.
];

jest.setTimeout(10000);

test("get abi", async () => {
  const abi = await api.getAbi("0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48");
  expect(abi[0]).toStrictEqual(someAbi[0]);
});

test("get code", async () => {
  const code = await api.getCode("0xD33526068D116cE69F19A9ee46F0bd304F21A51f");
  expect(code.language).toStrictEqual("Solidity");
  expect(Object.keys(code.sources).length).toStrictEqual(11);
});
