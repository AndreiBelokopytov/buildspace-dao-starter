import { ContractDeployer } from "@thirdweb-dev/sdk";
import { readFileSync } from "fs";
import { sdk } from "./1-initialize-sdk";

const deployer = new ContractDeployer(process.env.NETWORK);

(async () => {
  try {
    const editionDropAddress = await deployer.deployTokenDrop({
      name: "FogelDAO membership",
      description: "A DAO for Fogel club members",
      image: readFileSync("scripts/assets/russian_flag.png"),
      primary_sale_recipient: "0x797D19711fB4a4363AFc6fdc5070097485708ee9",
    });

    const editionDrop = sdk.getEditionDrop(editionDropAddress);

    const metadata = await editionDrop.metadata.get();

    console.log(
      "✅ Successfully deployed editionDrop contract, address:",
      editionDropAddress
    );
    console.log("✅ editionDrop metadata:", metadata);
  } catch (error) {
    console.log("failed to deploy editionDrop contract", error);
  }
})();
