async function connectWallet() {

  if (!window.ethereum) {
    alert("Install OKX Wallet or MetaMask");
    return;
  }

  try {

    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x3D8" }]
    });

  } catch (switchError) {

    if (switchError.code === 4902) {

      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [{
          chainId: "0x3D8",
          chainName: "OPN Chain",
          nativeCurrency: {
            name: "IOPN",
            symbol: "IOPN",
            decimals: 18
          },
          rpcUrls: [
            "https://testnet-rpc2.iopn.tech"
          ],
          blockExplorerUrls: [
            "https://testnet.iopn.tech"
          ]
        }]
      });

    }

  }

  const accounts =
    await window.ethereum.request({
      method: "eth_requestAccounts"
    });

  document
    .getElementById("connectWallet")
    .innerText =
    accounts[0].slice(0,6)
    + "..."
    + accounts[0].slice(-4);
}

document
.getElementById("connectWallet")
.addEventListener("click", connectWallet);
