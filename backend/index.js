const express = require("express");
const { ethers } = require("ethers");

const { burnOnSui } = require("../Contract/Sui/sui.js");
const { mintOnEthereum } = require("../Contract/Ethereum/ethers.js");

const app = express();
app.use(express.json());

// Configure RPC URLs și chei private
const ethProvider = new ethers.JsonRpcProvider(process.env.ETH_RPC_URL);
const { JsonRpcProvider } = require("@mysten/sui.js/providers/json-rpc-provider");


app.post("/bridge", async (req, res) => {
    const { sourceChain, destinationChain, amount, userAddress, coinObjectId } = req.body;

    if (sourceChain === "Ethereum" && destinationChain === "Sui") {
        // TODO: Implement Ethereum burn & Sui mint
        res.status(501).json({ error: "Ethereum to Sui bridge not yet implemented" });
    } else if (sourceChain === "Sui" && destinationChain === "Ethereum") {
        try {
            // Burn tokens on Sui
            await burnOnSui("YOUR_SUI_MINT_CAP_ID", coinObjectId);

            // Mint tokens on Ethereum
            await mintOnEthereum(userAddress, amount);

            res.status(200).json({ message: "Bridge completed from Sui to Ethereum" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    } else {
        res.status(400).json({ error: "Invalid source or destination chain" });
    }
});

app.listen(3000, () => console.log("Backend running on http://localhost:3000"));
