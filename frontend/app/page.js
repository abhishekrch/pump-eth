'use client';

import { useState } from "react";
import Header from "./components/Header";

export default function Home() {
  const [account, setAccount] = useState(null)

  return (
    <div className="page">
      <Header account={account} setAccount={setAccount} />
    </div>
  )
}
