const main = async () => {
  const [deployer] = await hre.ethers.getSigners();
  const accountBalance = await deployer.getBalance();

  console.log("Deploying contracts with account: ", deployer.address);
  console.log("Account balance: ", accountBalance.toString());

  const etherPortalFactory = await hre.ethers.getContractFactory("EtherPortal");
  const etherPortalContract = await etherPortalFactory.deploy({
    value: hre.ethers.utils.parseEther("0.001"),
  });
  await etherPortalContract.deployed();

  console.log("Ethereum Portal address: ", etherPortalContract.address);
};

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
