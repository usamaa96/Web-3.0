import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const editionDrop = sdk.getEditionDrop(
  "0x606f2BEb9b75300163009ae093726EAE7765b6b5"
);

(async () => {
  try {
    await editionDrop.createBatch([
      {
        name: "Football Shirt",
        description: "This NFT will give you access to FootballDao!",
        image: readFileSync("scripts/assets/shirt.jpg"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})();
