const { AddressZero } = require("@ethersproject/constants");
const sdk = require("./1-initialize-sdk");

(async () => {
  try {
    const tokenAddress = await sdk.deployer.deployToken({
      name: "Fogel DAO Governance token",
      symbol: "FOGEL",
      primary_sale_recipient: AddressZero,
    });
    console.log(
      "✅ Successfully deployed token module, address:",
      tokenAddress
    );
  } catch (error) {
    console.error("failed to deploy token module", error);
  }
})();
