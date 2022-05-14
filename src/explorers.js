exports.blockExplorer = (chainName) => {
  const blockExplorers = {
    polygon: "api.polygonscan.com/",
    ethereum: "api.etherscan.io",
    fantom: "api.ftmscan.com",
    bsc: "api.bscscan.com",
  };

  let baseUrl =
    blockExplorers[chainName?.toLowerCase()] ?? blockExplorers.ethereum;
  return `https://${baseUrl}`;
};
