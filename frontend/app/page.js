'use client';

import { useEffect, useState } from "react";
import Header from "./components/Header";
import { ethers } from 'ethers';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/utils/Factory";
import "./globals.css";

export default function Home() {
  const [account, setAccount] = useState(null)
  const [provider, setProvider] = useState(null)
  const [factory, setFactory] = useState(null)
  const [fee, setFee] = useState(0)

  async function loadBlockchainData() {
    const provider = new ethers.BrowserProvider(window.ethereum)
    setProvider(provider)

    const network = await provider.getNetwork()

    const factory = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider)
    setFactory(factory)

    const fee = await factory.fee()
    console.log(fee);
    setFee(fee)
  }

  async function checkWalletConnection() {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
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
          <button className="btn--fancy">
              {"[ create a new token ]"}
          </button>
        </div>
        </main>

    </div>
  )
}
