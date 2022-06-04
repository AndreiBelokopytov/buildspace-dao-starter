const ThirdwebSDK = require("@thirdweb-dev/sdk").ThirdwebSDK;
const dotenv = require("dotenv");

dotenv.config();

const sdk = ThirdwebSDK.fromPrivateKey(
  process.env.PRIVATE_KEY,
  process.env.NETWORK
);

(async () => {
  try {
    const address = await sdk.wallet.getAddress();
    console.log("SDK initialized by address:", address);
  } catch (err) {
    console.error("Failed to get apps from the sdk", err);
    process.exit(1);
  }
})();

module.exports = sdk;
