require("dotenv").config();
const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");
const solc = require("solc");

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
const signer = new ethers.Wallet(process.env.GANACHE_PRIVATE_KEY, provider);

const contractPath = path.resolve(__dirname, "../contracts", "HelloBlockchain.sol");
const source = fs.readFileSync(contractPath, "utf8");

