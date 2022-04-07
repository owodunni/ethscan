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

  const parser = (r) => {
    return JSON.parse(JSON.parse(r.data).result);
  };
  return {
    getAbi: (address) => get("contract", "getabi", address),
    getCode: (address) => get("contract", "getsourcecode", address),
    getByteCode: (address) => get("contract", "getbytecode", address),
  };
};
