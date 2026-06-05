document
.getElementById("connectWallet")
.addEventListener("click", async () => {

if (!window.ethereum) {

alert("Install OKX Wallet or MetaMask");

return;

}

const accounts =
await window.ethereum.request({
method:"eth_requestAccounts"
});

document
.getElementById("connectWallet")
.innerText =
accounts[0].slice(0,6)
+
"..."
+
accounts[0].slice(-4);

});
