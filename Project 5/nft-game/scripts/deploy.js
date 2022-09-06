let gameContract;
const main = async () => {
  const gameContractFactory = await hre.ethers.getContractFactory("NftGame");
  gameContract = await gameContractFactory.deploy(
    ["Leo", "Aang", "Pikachu"], // Names
    [
      "https://i.imgur.com/pKd5Sdk.png", // Images
      "https://i.imgur.com/xVu4vFL.png",
      "https://i.imgur.com/WMB6g9u.png",
    ],
    [100, 200, 300], // HP values
    [100, 50, 25],
    "Elon Musk", // Boss name
    "https://i.imgur.com/AksR0tt.png", // Boss image
    10000, // Boss hp
    50 // Boss attack damage
  );

  await gameContract.deployed();
  console.log("Contract deployed to:", gameContract.address);

  // await mintCharacter(2);
  // await mintCharacter(0);
  // await mintCharacter(1);
  // await mintCharacter(0);
  // console.log("Done Minting");

  // attackBoss();
  // attackBoss();
};

async function attackBoss() {
  let txn = await gameContract.attackBoss();
  await txn.wait();
}

async function mintCharacter(characterNumber) {
  let txn;
  txn = await gameContract.mintCharacterNFT(characterNumber);
  await txn.wait();
  console.log("Minted Character", characterNumber);
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
