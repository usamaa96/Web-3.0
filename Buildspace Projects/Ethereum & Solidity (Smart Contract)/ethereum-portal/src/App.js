import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import "./App.css";
import abi from "./utils/EtherPortal.json";

export default function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [allHellos, setAllHellos] = useState([]);

  const connectWallet = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Get MetaMask!");
      return;
    }

    const accounts = await ethereum.request({ method: "eth_requestAccounts" });

    console.log("Connected To Account: ", accounts[0]);
    setCurrentAccount(accounts[0]);

    await getAllHellos();
  };

  const readAndWrite = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        // Ether is a library that helps in contact with our contract
        /* Provider is used to talk to Ethereum Nodes. MetaMask in BG provides us some nodes which is used to send/receive data
           from deployed contract 
        */
        const provider = new ethers.providers.Web3Provider(ethereum);

        const signer = provider.getSigner();

        let contractABI = abi.abi;
        let contractAddress = "0xe72c355f5a2Ba7a5ECAC6776c9343dEcB418AC5b";

        const etherPortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        let count = await etherPortalContract.getTotalHellos();
        console.log("Retrieved total hello count...", count.toNumber());

        const helloTransaction = await etherPortalContract.sayHello(
          "Test Message"
        );

        console.log("Mining...", helloTransaction.hash);
        await helloTransaction.wait();
        console.log("Mined -- ", helloTransaction.hash);

        count = await etherPortalContract.getTotalHellos();
        console.log("Retrieved total hello count...", count.toNumber());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllHellos = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        let contractABI = abi.abi;
        let contractAddress = "0xe72c355f5a2Ba7a5ECAC6776c9343dEcB418AC5b";
        const etherPortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        /*
         * Call the getAllHellos method from your Smart Contract
         */
        const hellos = await etherPortalContract.getAllHellos();
        updateHellos(hellos);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  function updateHellos(hellos) {
    let hellosList = [];
    hellos.forEach((h) => {
      hellosList.push({
        address: h.sender,
        timestamp: new Date(h.timestamp * 1000),
        message: h.message,
      });
    });

    setAllHellos(hellosList);
  }

  // Checking If MetaMask wallet extension is connected or not. We get the ethereum object if wallet is connected to the website
  useEffect(() => {
    async function isWalletConnected() {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Wallet Not Connected");
      } else console.log("Wallet Connected");

      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length != 0) {
        const account = accounts[0];
        setCurrentAccount(account);
        console.log("Account Connected: ", account);

        await getAllHellos();
      } else console.log("Account Not Found");
    }
    isWalletConnected();
  }, []);

  useEffect(() => {
    let etherPortalContract;

    const onNewGreeting = (from, timestamp, message) => {
      console.log("New Greetings", from, timestamp, message);
      setAllHellos((prevState) => [
        ...prevState,
        {
          address: from,
          timestamp: new Date(timestamp * 1000),
          message: message,
        },
      ]);
    };

    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      let contractABI = abi.abi;
      let contractAddress = "0xe72c355f5a2Ba7a5ECAC6776c9343dEcB418AC5b";

      etherPortalContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      etherPortalContract.on("NewGreeting", onNewGreeting);
    }

    return () => {
      etherPortalContract &&
        etherPortalContract.off("NewGreeting", onNewGreeting);
    };
  }, []);

  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">👋 Hey there!</div>

        <div className="bio">
          I am Usama. Software Enginner that loves to play around with
          technology ! ;-)
        </div>

        <button className="helloButton" onClick={readAndWrite}>
          Say Hello To Me
        </button>

        {!currentAccount && (
          <button className="helloButton" onClick={connectWallet}>
            Connect To MetaMask
          </button>
        )}

        {allHellos.map((hello, index) => {
          return (
            <div
              key={index}
              style={{
                backgroundColor: "OldLace",
                marginTop: "16px",
                padding: "8px",
              }}
            >
              <div>Address: {hello.address}</div>
              <div>Time: {hello.timestamp.toString()}</div>
              <div>Message: {hello.message}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
