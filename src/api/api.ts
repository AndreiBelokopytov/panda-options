import axios from "axios";

export const instance = axios.create({
  baseURL: "https://api.coinbase.com/v2/prices",
});
