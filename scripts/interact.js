require("dotenv").config();
const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");
const solc = require("solc");

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
const signer = new ethers.Wallet(process.env.GANACHE_PRIVATE_KEY, provider);

const deployedPath = path.resolve(__dirname, "../build", "deployedContract.json");

if (!fs.existsSync(deployedPath)) {
    console.error("❌ deployedContract.json not found! Please deploy the contract first.");
    process.exit(1);
}

const { address: CONTRACT_ADDRESS, abi } = JSON.parse(fs.readFileSync(deployedPath, "utf8"));

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