const sdk = require("./1-initialize-sdk.js");
const { readFileSync } = require("fs");

const EDITION_DROP_ADDRESS = "0x458E37d2Ec90cf031cf07740E82a6281aDb99314";

const editionDrop = sdk.getEditionDrop(EDITION_DROP_ADDRESS);

(async () => {
  try {
    const results = await editionDrop.createBatch([
      {
        name: "Fogel membership card",
        description: "This token gives you access to the Fogel Club",
        image: readFileSync("scripts/assets/peace.jpg"),
      },
    ]);

    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})();
