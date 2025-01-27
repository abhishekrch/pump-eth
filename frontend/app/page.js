'use client';

import { useState } from "react";
import Header from "./components/Header";
import { ethers } from 'ethers';

export default function Home() {
  const [account, setAccount] = useState(null)
  const [provider, setProvider] = useState(null)

  async function loadBlockchainData() {
    const provider = new ethers.BrowserProvider(window.ethereum)
    setProvider(provider)

    const network = await provider.getNetwork()
  }

  useEffect(() => {
    loadBlockchainData()
  }, [])

  return (
    <div className="page">
      <Header account={account} setAccount={setAccount} />
    </div>
  )
}
