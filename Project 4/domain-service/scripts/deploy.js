const main = async () => {
  const domainContractFactory = await hre.ethers.getContractFactory("Domains");
  const domainContract = await domainContractFactory.deploy("usama");
  await domainContract.deployed();

  let domainName = "code-with-me";

  console.log("Contract deployed to:", domainContract.address);

  //   await registerDomain(domainName, domainContract);
  //   await setDomainRecord(domainContract, domainName, "My Record");
  //   await getDomainOwner(domainContract, domainName);
  //   await contractBalance(domainContract);
};

async function registerDomain(domainName, contract) {
  // Passing money with data
  const txn = await contract.register(domainName, {
    value: hre.ethers.utils.parseEther("0.1"),
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

async function contractBalance(contract) {
  const balance = await hre.ethers.provider.getBalance(contract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
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
