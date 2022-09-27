const main = async () => {
  const nftContractFactory = await hre.ethers.getContractFactory("Nft");
  const nftContract = await nftContractFactory.deploy();
  await nftContract.deployed();
  console.log("Contract deployed to:", nftContract.address);

  await mintNft(nftContract);
  console.log(await nftContract.getMintedNfts().value);
};

async function mintNft(contract) {
  // Call the function.
  let txn = await contract.makeAnEpicNFT();
  // Wait for it to be mined.
  await txn.wait();

  // Mint another NFT.
  txn = await contract.makeAnEpicNFT();
  // Wait for it to be mined.
  await txn.wait();
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
