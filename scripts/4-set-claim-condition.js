const sdk = require("./1-initialize-sdk.js");
const { MaxUint256 } = require("@ethersproject/constants");

const EDITION_DROP_ADDRESS = "0x458E37d2Ec90cf031cf07740E82a6281aDb99314";

const editionDrop = sdk.getEditionDrop(EDITION_DROP_ADDRESS);

const claimConditions = [
  {
    startTime: new Date(),
    maxQuantity: 50_000,
    price: 0,
    quantityLimitPerTransaction: 1,
    waitInSeconds: MaxUint256,
  },
];

(async () => {
  try {
    await editionDrop.claimConditions.set(0, claimConditions);
    console.log("✅ Successfully set claim condition!");
  } catch (error) {
    console.error("Failed to set claim condition", error);
  }
})();
