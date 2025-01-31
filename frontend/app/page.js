"use client";

import { useEffect, useState } from "react";
import Header from "./components/Header";
import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/utils/Factory";
import "./globals.css";
import List from "./components/List";
import images from "@/utils/images";
import Token from "./components/Token";
import Trade from "./components/Trade";

export default function Home() {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [factory, setFactory] = useState(null);
  const [fee, setFee] = useState(0);
  const [showCreate, setShowCreate] = useState(false);
  const [tokens, setTokens] = useState([]);
  const [token, setToken] = useState(null);
  const [showTrade, setShowTrade] = useState(false);

  function toggleCreate() {
    showCreate ? setShowCreate(false) : setShowCreate(true);
  }

  function toggleTrade(token) {
    setToken(token);
    showTrade ? setShowTrade(false) : setShowTrade(true);
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
    setFee(fee);

    const totalTokens = await factory.totalTokens();
    const tokens = [];

    for (let i = 0; i < totalTokens; i++) {
      if (i == 6) {
        break;
      }
      const tokenSale = await factory.getTokenSale(i);

      const token = {
        token: tokenSale.token,
        name: tokenSale.name,
        creator: tokenSale.creator,
        sold: tokenSale.sold,
        raised: tokenSale.raised,
        isOpen: tokenSale.isOpen,
        image: images[i],
      };

      tokens.push(token);
    }
    setTokens(tokens.reverse());
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
          <button
            onClick={factory && account && toggleCreate}
            className="btn--fancy"
          >
            {!factory
              ? "[ Contract not deployed ]"
              : !account
              ? "[ Please Connect ]"
              : "[ Start a new token ]"}
          </button>
        </div>

        <div className="listings">
          <h1>new listings</h1>

          <div className="tokens">
            {!account ? (
              <p>please connect wallet</p>
            ) : tokens.length === 0 ? (
              <p>no tokens listed</p>
            ) : (
              tokens.map((token, index) => (
                <Token
                  toggleTrade={toggleTrade}
                  token={token}
                  key={index}
                />
              ))
            )}
          </div>
        </div>
      </main>

      {showCreate && (
        <List
          toggleCreate={toggleCreate}
          fee={fee}
          provider={provider}
          factory={factory}
        />
      )}

      {showTrade && (
        <Trade
          toggleTrade={toggleTrade}
          token={token}
          fee={fee}
          provider={provider}
          factory={factory}
        />
      )}
    </div>
  );
}
