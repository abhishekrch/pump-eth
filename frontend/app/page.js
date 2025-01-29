"use client";

import { useEffect, useState } from "react";
import Header from "./components/Header";
import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/utils/Factory";
import "./globals.css";
import List from "./components/List";

export default function Home() {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [factory, setFactory] = useState(null);
  const [fee, setFee] = useState(0);
  const [showCreate, setShowCreate] = useState(false);

  function toggleCreate() {
    showCreate ? setShowCreate(false) : setShowCreate(true);
  }

  async function loadBlockchainData() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    setProvider(provider);

    const network = await provider.getNetwork();

    const factory = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      provider
    );
    setFactory(factory);

    const fee = await factory.fee();
    console.log(fee);
    setFee(fee);
  }

  async function checkWalletConnection() {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          const account = ethers.getAddress(accounts[0]);
          setAccount(account);
        }
      }
    } catch (e) {
      console.error("Error checking wallet connection:", e);
    }
  }

  useEffect(() => {
    checkWalletConnection();
    loadBlockchainData();
  }, []);

  return (
    <div className="page">
      <Header account={account} setAccount={setAccount} />

      <main>
        <div className="create">
          <button onClick={factory && account && toggleCreate} className="btn--fancy">
          {!factory ? (
              "[ Contract not deployed ]"
            ) : !account ? (
              "[ Please Connect ]"
            ) : (
              "[ Start a new token ]"
            )}
          </button>
        </div>
      </main>

      {showCreate && (
        <List toggleCreate={toggleCreate} fee = {fee} provider={provider} factory={factory} />
      )}
    </div>
  );
}
