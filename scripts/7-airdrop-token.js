const sdk = require("./1-initialize-sdk.js");

const TOKEN_ADDRESS = "0xC0c002Dd442B6e48f7d7Aff66457cc2b20B40027";
const EDITION_DROP_ADDRESS = "0x458E37d2Ec90cf031cf07740E82a6281aDb99314";
const AIRDROP_AMOUNT = 1000;

const token = sdk.getToken(TOKEN_ADDRESS);
const editionDrop = sdk.getEditionDrop(EDITION_DROP_ADDRESS);

(async () => {
  try {
    const walletAddresses = await editionDrop.history.getAllClaimerAddresses(0);
    if (walletAddresses.length === 0) {
      console.log(
        "No NFTs have been claimed yet, maybe get some friends to claim your free NFTs!"
      );
      process.exit(0);
    }

    const airdropTargets = walletAddresses.map((address) => {
      console.log("✅ Going to airdrop", AIRDROP_AMOUNT, "tokens to", address);
      return {
        toAddress: address,
        amount: AIRDROP_AMOUNT,
      };
    });

    console.log("🌈 Starting airdrop...");
    await token.transferBatch(airdropTargets);
    console.log(
      "✅ Successfully airdropped tokens to all the holders of the NFT!"
    );
  } catch (error) {
    console.error("Failed to airdrop tokens", error);
  }
})();
