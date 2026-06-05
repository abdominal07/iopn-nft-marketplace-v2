const CONTRACT =
"0x947D37af32CD984Db50AB376dDb0702615D0b28f";

let signer;
let contract;

async function loadABI() {
const response = await fetch("./abi.json");
return await response.json();
}

async function initContract() {

if (!window.ethereum) {
alert("Please install OKX Wallet or MetaMask");
return false;
}

const provider =
new ethers.BrowserProvider(window.ethereum);

signer =
await provider.getSigner();

const abi =
await loadABI();

contract =
new ethers.Contract(
CONTRACT,
abi,
signer
);

return true;
}

document
.getElementById("mintNFT")
.addEventListener("click", async () => {

try {

```
if (!contract) {

  const ready =
  await initContract();

  if (!ready) return;

}

const uri =
  document
  .getElementById("metadata")
  .value;

if (!uri) {

  alert("Enter IPFS Metadata URI");

  return;

}

const tx =
  await contract.mint(uri);

alert("Transaction sent");

await tx.wait();

alert("NFT Minted Successfully 🎉");
```

}

catch(err) {

```
console.error(err);

alert("Mint Failed");
```

}

});
