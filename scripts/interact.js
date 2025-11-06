require("dotenv").config();
const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");
const solc = require("solc");

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
const signer = new ethers.Wallet(process.env.GANACHE_PRIVATE_KEY, provider);

const contractPath = path.resolve(__dirname, "../contracts", "HelloBlockchain.sol");
const source = fs.readFileSync(contractPath, "utf8");

const input = {
    language: "Solidity",
    sources: {
        "HelloBlockchain.sol": {
            content: source
        },
    },
    settings: { outputSelection: { "*": { "*": ["abi"] } } },
};

const compiled = JSON.parse(solc.compile(JSON.stringify(input)));
const abi = compiled.contracts["HelloBlockchain.sol"]["HelloBlockchain"].abi;

const CONTRACT_ADDRESS = "0xa0F88d1CCEEe8651631B01825B01CBE627150F16"