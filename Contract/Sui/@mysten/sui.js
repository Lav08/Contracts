const suiMintCapId = "YOUR_SUI_MINT_CAP_ID"; // ID-ul MintCap din contractul Sui
const suiKeypair = Ed25519Keypair.fromSecretKey(new Uint8Array(Buffer.from(process.env.SUI_PRIVATE_KEY, "hex")));
const suiSigner = new RawSigner(suiKeypair, suiProvider);

try {
    // Efectuăm apelul către `mint` pe Sui
    const mintTx = await suiSigner.executeMoveCall({
        packageObjectId: "YOUR_PACKAGE_ID", // ID-ul pachetului Sui
        module: "IBTToken",
        function: "mint",
        typeArguments: [],
        arguments: [suiMintCapId, amount],
        gasBudget: 10000,
    });
    console.log(`Sui Mint Transaction: ${JSON.stringify(mintTx)}`);
} catch (err) {
    console.error("Error minting tokens on Sui:", err);
    res.status(500).json({ error: "Failed to mint tokens on Sui" });
    return;
}
const { JsonRpcProvider, RawSigner, Ed25519Keypair } = require('@mysten/sui.js');


async function burnOnSui(suiMintCapId, coinObjectId, gasBudget = 10000) {
    try {
        const burnTx = await suiSigner.executeMoveCall({
            packageObjectId: "YOUR_PACKAGE_ID", // ID-ul pachetului Sui
            module: "IBTToken",
            function: "burn",
            typeArguments: [],
            arguments: [suiMintCapId, coinObjectId], // MintCap și ID-ul obiectului IBTCoin
            gasBudget,
        });
        console.log(`Sui Burn Transaction: ${JSON.stringify(burnTx)}`);
        return burnTx;
    } catch (err) {
        console.error("Error burning tokens on Sui:", err);
        throw new Error("Failed to burn tokens on Sui");
    }
}

module.exports = { burnOnSui };
