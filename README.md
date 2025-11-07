# 🧱 Solidity Hello Local

A simple **Solidity project** showing how to **compile, deploy, and interact** with a smart contract **locally** using **Node.js**, **Ethers.js**, **Solc**, and **Ganache** — all without Hardhat or MetaMask.

This setup uses a **local Ganache blockchain** because earlier testing with MetaMask and Alchemy testnets had connectivity issues. Running locally keeps everything fast, self-contained, and ideal for beginners.

---

## ⚙️ Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create a `.env` file**:
   ```bash
   GANACHE_PRIVATE_KEY=your_ganache_private_key_here
   ```

3. **Start Ganache**
   ```bash
   npx ganache
   ```

---

## 🚀 Deploy the Contract

Deploy your Solidity contract to the local blockchain:

```bash
node scripts/deploy.js
```

This script:
- Compiles the contract with `solc`
- Deploys it to Ganache using `ethers.js`
- Saves its address & ABI to `build/deployedContract.json`

Example output:
```
✅ Contract deployed at: 0xC8408323751E25cb75320BA12D6e04eD14Fe43Eb
📝 Deployment data saved to build/deployedContract.json
```

---

## 💬 Interact with the Contract

After deployment, interact with it using:

```bash
node scripts/interact.js
```

Example:
```
Connected to contract at: 0xC8408323751E25cb75320BA12D6e04eD14Fe43Eb
Current Message: Hello, Blockchain!
Updated Message: Updated from Node.js!
```

The script automatically reads the contract’s address and ABI from the JSON file.

---

## 🧰 Tech Used

- **Solidity** — Smart contracts  
- **Ganache** — Local blockchain  
- **Ethers.js** — Blockchain interaction  
- **Solc** — Solidity compiler  
- **dotenv** — Environment variables  

---

## 🏁 Summary

This project shows how to:
- Compile and deploy a Solidity contract manually  
- Interact with it via Node.js  
- Run everything locally using Ganache  
- Automate contract address saving for reuse  

Perfect for learning Ethereum basics before moving on to frameworks like **Hardhat** or **Foundry**.