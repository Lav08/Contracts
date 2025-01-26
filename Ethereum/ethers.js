const ethContractAddress = "YOUR_ETHEREUM_CONTRACT_ADDRESS"; // Adresa contractului Ethereum
const ethPrivateKey = "YOUR_PRIVATE_KEY"; // Cheia privată a deținătorului
const ethProvider = new ethers.JsonRpcProvider(process.env.ETH_RPC_URL); // URL RPC Ethereum
const ethSigner = new ethers.Wallet(ethPrivateKey, ethProvider);
const ethAbi = [
    "function burn(address from, uint256 amount) external"
];
const ethContract = new ethers.Contract(ethContractAddress, ethAbi, ethSigner);

try {
    // Efectuăm apelul către `burn`
    const burnTx = await ethContract.burn(userAddress, ethers.utils.parseEther(amount.toString()));
    await burnTx.wait(); // Așteptăm confirmarea tranzacției
    console.log(`Ethereum Burn Transaction Hash: ${burnTx.hash}`);
} catch (err) {
    console.error("Error burning tokens on Ethereum:", err);
    res.status(500).json({ error: "Failed to burn tokens on Ethereum" });
    return;
}
const { ethers } = require("ethers");


async function mintOnEthereum(userAddress, amount) {
    try {
        const mintTx = await ethContract.mint(userAddress, ethers.utils.parseEther(amount.toString()));
        await mintTx.wait();
        console.log(`Ethereum Mint Transaction Hash: ${mintTx.hash}`);
        return mintTx;
    } catch (err) {
        console.error("Error minting tokens on Ethereum:", err);
        throw new Error("Failed to mint tokens on Ethereum");
    }
}

module.exports = { mintOnEthereum };
