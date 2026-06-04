const CONTRACT =
"0x947D37af32CD984Db50AB376dDb0702615D0b28f";

let signer;
let contract;

async function loadABI() {

    const response =
    await fetch("./abi.json");

    return await response.json();
}

document
.getElementById("connectBtn")
.onclick = async () => {

    try {

        const provider =
        new ethers.BrowserProvider(
            window.ethereum
        );

        await provider.send(
            "eth_requestAccounts",
            []
        );

        signer =
        await provider.getSigner();

        const address =
        await signer.getAddress();

        document
        .getElementById("wallet")
        .innerText = address;

        const abi =
        await loadABI();

        contract =
        new ethers.Contract(
            CONTRACT,
            abi,
            signer
        );

    } catch(err) {

        console.error(err);

    }

};

document
.getElementById("mintBtn")
.onclick = async () => {

    try {

        const uri =
        document
        .getElementById("metadata")
        .value;

        const tx =
        await contract.mint(uri);

        document
        .getElementById("status")
        .innerText =
        "Transaction sent...";

        await tx.wait();

        document
        .getElementById("status")
        .innerText =
        "NFT Minted 🎉";

    } catch(err) {

        console.error(err);

        document
        .getElementById("status")
        .innerText =
        "Mint failed";

    }

};
