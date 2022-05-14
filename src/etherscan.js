const Axios = require("axios");

exports.API = (apiKey, apiUrl) => {
  if (!apiUrl) apiUrl = "https://api.etherscan.io";
  apiUrl = `${apiUrl}/api`;
  const axios = new Axios.Axios({ baseURL: apiUrl });

  const get = (module, action, address) =>
    axios
      .get(
        `?module=${module}&action=${action}&address=${address}&apikey=${apiKey}`
      )
      .then(parser);

  const parser = (response) => {
    const data = JSON.parse(response.data);
    if (!data.result) throw data.message;

    // If status is 0 that means we have some issues when fetching the contract
    // throw the result which should be an error message
    if (!Number(data.status)) throw data.result;
    const result = data.result;
    if (typeof result === "string") return JSON.parse(result);
    return result;
  };

  const codeParser = (result) => {
    const data = result[0].SourceCode;
    if (!data) {
      throw "Contract source code might not be verified";
    }
    if (data.startsWith("// File:")) {
      return { sources: { "all-in-one.sol": { content: data } } };
    } else {
      const dataSliced = data.slice(1, -1);
      return JSON.parse(dataSliced);
    }
  };
  return {
    getAbi: (address) => get("contract", "getabi", address),
    getCode: (address) =>
      get("contract", "getsourcecode", address).then(codeParser),
  };
};
