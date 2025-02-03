import { ethers } from 'ethers';

function Header({ account, setAccount }) {
    async function connectWallet() {
        try {
            if(!window.ethereum) {
                alert('Please install any ethereum wallet')
                return;
            }
            const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
            const account = ethers.getAddress(accounts[0])
            setAccount(account);
        } catch (e) {
            console.error("Error connecting wallet", e);
            alert("Failed to connect wallet. Please make sure any ethereum wallet is installed");
        }
    }

    return (
        <header>
          <p className="brand">pump.eth</p>
            {account ? (
              <div className="btn--fancy">
                <span>Connected: {account.slice(0, 6)}...{account.slice(-4)}</span>
              </div>
            ) : (
              <button className="btn--fancy" onClick={connectWallet}>
                Connect Wallet
              </button>
            )}
        </header>
    );
}
    
    export default Header;
    
