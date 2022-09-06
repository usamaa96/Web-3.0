const main = async () => {
  let domainName = "hello-test-usama";
  const [owner, randomUser] = await hre.ethers.getSigners();

  const domainContractFactory = await hre.ethers.getContractFactory("Domains");
  const domainContract = await domainContractFactory.deploy("usama");
  await domainContract.deployed();

  console.log("Contract deployed to:", domainContract.address);
  console.log("Contract deployed by:", owner.address);

  await registerDomain(domainName, domainContract);
  await getBalance(domainContract, "Contract");

  try {
    await withdrawAmountWith(domainContract, randomUser);
  } catch (error) {
    console.log("Could not rob contract");
  }

  await getBalance(owner, "Owner");
  await withdrawAmountWith(domainContract, owner);
  await getBalance(domainContract, "Contract");
  await getBalance(owner, "Owner");
};

async function withdrawAmountWith(contract, user) {
  txn = await contract.connect(user).withdraw();
  await txn.wait();
}

async function registerDomain(domainName, contract) {
  // Passing money with data (Being Extra Generous. Amount could be 0.1 MATIC)
  const txn = await contract.register(domainName, {
    value: hre.ethers.utils.parseEther("150"),
  });
  await txn.wait();
  console.log("Minted domain ", domainName);
}

async function getDomainOwner(contract, domainName) {
  const address = await contract.getAddress(domainName);
  console.log("Owner of domain ", domainName, ": ", address);
}

async function setDomainRecord(contract, domainName, record) {
  txn = await contract.setRecord(domainName, record);
  await txn.wait();
}

async function getBalance(val, type) {
  const balance = await hre.ethers.provider.getBalance(val.address);
  console.log("Balance Of ", type, ": ", hre.ethers.utils.formatEther(balance));
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log("Error: ", error);
    process.exit(1);
  }
};

runMain();
