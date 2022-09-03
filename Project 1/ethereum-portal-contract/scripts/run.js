const main = async () => {
  // Getting owner's wallet address. Harhat does this on BG when deploying the contract (wallet address is required as we know)
  const [owner] = await hre.ethers.getSigners();

  /* Will compile the contract and generate neccessary files to work with under /artifact folder. 
    'hre' Hardhat Runtime Environment is an object that contains all the functionlaity to run a task and we get this object under the 
    fly when we run terminal command starting with 'npx hardhat'
  */
  const etherPortalFactory = await hre.ethers.getContractFactory("EtherPortal");

  /* Hardhat will start local Ethereum Server in which this contract will run. After execution of contract the server will be destroyed. 
     Every time script is run it will execute a fresh blockchain
     The value is used to fund the contract. This will deduct 0.1 ETH from our wallet and fund the contract
  */
  const etherPortalContract = await etherPortalFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });

  // Wait until contract is deployed. The constructor run is the signal that contract successfully deployed
  await etherPortalContract.deployed();

  /* Gives the address of the deployed contract. There are millions of contracts on blockchain so this address is the unique one to 
    find our contract only.
  */
  console.log("Contract deployed to:", etherPortalContract.address);

  // Displaying owner's wallet address
  console.log("Contract deployed by:", owner.address);

  // Checking Contract Balance
  contractBalance(etherPortalContract);

  // Calling the contract from Owner's wallet address
  await executeContract_Test(etherPortalContract);

  // Checking Contract Balance
  contractBalance(etherPortalContract);

  // Calling the contract from Random Person's wallet address
  await executeContractByRandomPerson(etherPortalContract);

  // Checking Contract Balance
  contractBalance(etherPortalContract);

  // Displaying List Of Greetings Received
  let allHellos = await etherPortalContract.getAllHellos();
  console.log("All Hellos: ", allHellos);
};

async function contractBalance(contract) {
  let contractBalance = await hre.ethers.provider.getBalance(contract.address);
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );
}

async function executeContract_Test(contract) {
  await contract.getTotalHellos();

  // Call the function and wait for tranasction to be Mined
  let helloTransaction = await contract.sayHello("Message One");
  await helloTransaction.wait();

  await contract.getTotalHellos();
}

async function executeContractByRandomPerson(contract) {
  const [_, randomPerson] = await hre.ethers.getSigners();

  let helloTransaction = await contract
    .connect(randomPerson)
    .sayHello("Message Two");
  await helloTransaction.wait();

  await contract.getTotalHellos();
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
