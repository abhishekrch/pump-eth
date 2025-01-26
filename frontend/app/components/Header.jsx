import { ethers } from 'ethers';

function Header({ account, setAccount }) {
    async function connectWallet() {
        try {
            if(!window.ethereum) {
                alert('Please install Metamask')
                return;
            }

            await window.ethereum.request({method: 'eth_requestAccounts'});

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();

            const address = await signer.getAddress();
            setAccount(address);
            
        } catch (e) {
            console.error("Error connecting wallet", e);
            alert("Failed to connect wallet. Please make sure MetaMask is installed");
        }
    }

    return (
        <header>
          <p className="brand">fun.pump</p>
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
    