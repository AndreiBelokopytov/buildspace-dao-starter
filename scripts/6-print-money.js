const sdk = require("./1-initialize-sdk.js");

const TOKEN_ADDRESS = "0xC0c002Dd442B6e48f7d7Aff66457cc2b20B40027";

const token = sdk.getToken(TOKEN_ADDRESS);

(async () => {
  try {
    const amount = 100_000;
    await token.mintToSelf(amount);
    const totalSupply = await token.totalSupply();
    console.log(
      "✅ There now is",
      totalSupply.displayValue,
      "$FOGEL in circulation"
    );
  } catch (error) {
    console.error("Failed to print money", error);
  }
})();
