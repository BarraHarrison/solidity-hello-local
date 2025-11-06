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

const CONTRACT_ADDRESS = "0x2519B9102E67cb52cB3ED37DD5b1fB6c20DA6F9b"

async function main() {
    const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
    console.log("Connected to contract at:", CONTRACT_ADDRESS);

    const currentMessage = await contract.message();
    console.log("Current Message:", currentMessage);

    const tx = await contract.setMessage("Updated from Node.js!");
    await tx.wait();

    const updatedMessage = await contract.message();
    console.log("Updated Message:", updatedMessage);
}

main().catch(console.error);