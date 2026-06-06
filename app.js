const CONTRACT =
"0x09442BED583cA221940a66b67460CAf654c3751c";

let signer;
let contract;

async function loadABI() {
const response = await fetch("./abi.json");
return await response.json();
}

async function initContract() {

if (!window.ethereum) {
alert("Install OKX Wallet or MetaMask");
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

await loadNFTs();
await loadMyNFTs();

return true;
}

async function loadNFTs() {

if (!contract) return;

const container =
document.querySelector(".cards");

if (!container) return;

container.innerHTML = "";

try {

```
const total =
  await contract.nextTokenId();

for (let i = 0; i < Number(total); i++) {

  try {

    const owner =
      await contract.ownerOf(i);

    const uri =
      await contract.tokenURI(i);

    container.innerHTML += `
    <div class="card">
      <img src="assets/nft1.jpg">
      <h3>IOPN NFT #${i}</h3>
      <p>${owner.slice(0,6)}...${owner.slice(-4)}</p>
      <small>${uri}</small>
    </div>
    `;

  } catch(err) {
    console.log(err);
  }

}
```

} catch(err) {
console.log(err);
}

}

async function loadMyNFTs() {

if (!contract || !signer) return;

const wallet =
await signer.getAddress();

const container =
document.getElementById("myNFTs");

if (!container) return;

container.innerHTML = "";

try {

```
const total =
  await contract.nextTokenId();

for (let i = 0; i < Number(total); i++) {

  try {

    const owner =
      await contract.ownerOf(i);

    if (
      owner.toLowerCase() ===
      wallet.toLowerCase()
    ) {

      const uri =
        await contract.tokenURI(i);

      container.innerHTML += `
      <div class="card">
        <img src="assets/nft1.jpg">
        <h3>My NFT #${i}</h3>
        <p>${uri}</p>
      </div>
      `;
    }

  } catch(err) {
    console.log(err);
  }

}
```

} catch(err) {
console.log(err);
}

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

alert("Transaction sent 🚀");

await tx.wait();

alert("NFT Minted Successfully 🎉");

await loadNFTs();
await loadMyNFTs();
```

} catch(err) {

```
console.error(err);

alert(
  "Mint Failed: " +
  err.message
);
```

}

});

window.addEventListener("load", async () => {
try {
await initContract();
} catch(err) {
console.log(err);
}
});
