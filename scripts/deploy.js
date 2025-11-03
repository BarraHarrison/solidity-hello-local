require("dotenv").config();

const fs = require("fs");
const path = require("path");
const solc = require("solc");
const { ethers } = require("ethers");

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

const signer = new ethers.Wallet(
    process.env.GANACHE_PRIVATE_KEY,
    provider
);

const contractPath = path.resolve(__dirname, "../contracts", "HelloBlockchain.sol");
const source = fs.readFileSync(contractPath, "utf8");

const input = {
    language: "Solidity",
    sources: {
        "HelloBlockchain.sol": { content: source },
    },
    settings: { outputSelection: { "*": { "*": ["abi", "evm.bytecode"] } } },
};

const compiled = JSON.parse(solc.compile(JSON.stringify(input)));
const contractFile = compiled.contracts["HelloBlockchain.sol"]["HelloBlockchain"];
const abi = contractFile.abi;
const bytecode = contractFile.evm.bytecode.object;

async function main() {
    console.log("Deploying contract...");

    const factory = new ethers.ContractFactory(abi, bytecode, signer);
    const contract = await factory.deploy("Hello, Blockchain!");

    await contract.waitForDeployment();

    console.log("Contract deployed at:", contract.target);
    console.log("Initial message:", await contract.message());
    console.log("Using solc version:", solc.version());
}

main().catch((err) => {
    console.error("Deployment failed:");
    console.error(err);
});

