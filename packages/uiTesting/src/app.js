import { ethers } from "./ethers-6.7.0.min.js";
window.ethers = ethers

const mainChain = {
  chainId: "0x1",
  rpcUrls: ["https://eth.llamarpc.com"],
  chainName: "Ethereum Mainnet",
  nativeCurrency: {
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18
  },
  //blockExplorerUrls: []
}

async function connectProvider() {
  if (window.ethereum) {
    await switchNetwork(mainChain)
    window.provider = new ethers.BrowserProvider(window.ethereum);
  } else {
    console.log("couldn't connect to window.ethereum using a external rpc")
    const providerUrls = ["https://mainnet.infura.io/v3/", "https://eth.llamarpc.com"]
    const workingProviderUrl = await getFirstAvailableProvider(providerUrls)
    console.log(workingProviderUrl)
    window.provider = new ethers.JsonRpcProvider(workingProviderUrl)
  }


}

async function switchNetwork(network = mainChain) {
  try {
    await window.provider.send("wallet_switchEthereumChain", [{ chainId: network.chainId }]);

  } catch (switchError) {
    window.switchError = switchError
    // This error code indicates that the chain has not been added to MetaMask.
    if (switchError.error && switchError.error.code === 4902) {
      try {
        await window.provider.send("wallet_addEthereumChain", [network]);

      } catch (addError) {
        // handle "add" error
      }
    }
    // handle other "switch" errors
  }

}

async function connectSigner(refreshNftDisplay = true) {
  // MetaMask requires requesting permission to connect users accounts
  if (!window.ethereum) {
    message("no inject ethereum wallet found please install metamask or equivalant!")
    document.getElementById("loading").innerText = ""

    return 0
  }

  //await switchNetwork(mainChain)
  await provider.send("eth_requestAccounts", []);
  window.signer = await provider.getSigner();
  //message("please connect wallet :)")
  window.userAddress = await window.signer.getAddress()
}
window.connectSigner = connectSigner


async function runOnLoad() {
  const domain = {
    "name": "jimjimsTest",
    "version": "1",
    "chainId": 1,
    "verifyingContract": "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC"
  }
  const types = {
    "message": [
      {
        "name": "valueA",
        "type": "string"
      },
      {
        "name": "valueB",
        "type": "address"
      },
    ]
  }
  const value = {
    "valueA": "hiiii",
    "valueB": "0x09750ad360fdb7a2ee23669c4503c974d86d8694"
  }



  await connectProvider()
  await connectSigner()
  window.ethers = ethers
  //await installSnap()



}
window.onload = runOnLoad;

async function installSnap() {
  // web3_clientVersion returns the installed MetaMask version as a string
  const isFlask = (
    await window.ethereum.request({ method: 'web3_clientVersion' })
  )?.includes('flask');

  if (provider && isFlask) {
    console.log('MetaMask Flask successfully detected!');
    //bug in docs it shows a array but should be object
    await window.ethereum.request({
      "method": "wallet_requestSnaps",
      "params": 
        // {
        //   "npm:@metamask/example-snap": {},
        //   "npm:fooSnap": {
        //     "version": "^1.0.2"
        // }
        {
          //"npm:@happyharpie": {},
          "npm:happyharpie": {}
      }
    });

    // Now you can use Snaps!
  } else {
    document.getElementById("message").innerText = 'Please install MetaMask Flask! https://github.com/MetaMask/snaps/discussions/2138'
    console.error('Please install MetaMask Flask!', error);
  }

}

async function signTypedData(signature) {
  delete signature.data.types.EIP712Domain
  await signer.signTypedData(signature.data.domain, signature.data.types, signature.data.message)

}

async function sendEthTo(address, value = ethers.parseEther("0.000000001"), data = undefined) {
  await signer.sendTransaction({
    to: address,
    value: value,
    data: data
  });

}

document.getElementById("signatureWithBadGuy").addEventListener("click", (event) => signTypedData(signatureWithBadGuy))
document.getElementById("openseaListingNormal").addEventListener("click", (event) => signTypedData(openseaListingNormal))
document.getElementById("openseaListingLowPrice").addEventListener("click", (event) => signTypedData(openseaListingLowPrice))
document.getElementById("openseaListingVeryLowPrice").addEventListener("click", (event) => signTypedData(openseaListingVeryLowPrice))
document.getElementById("openseaListingZeroPrice").addEventListener("click", (event) => signTypedData(openseaListingZeroPrice))

document.getElementById("sendEthToNormalAddress").addEventListener("click", (event) => sendEthTo(sendEthToNormalAddress.to))
document.getElementById("normalUniswapSwap").addEventListener("click", (event) => sendEthTo(normalUniswapSwap.to, normalUniswapSwap.data))
document.getElementById("sendEthToMaliciousAddress").addEventListener("click", (event) => sendEthTo(sendEthToMaliciousAddress.to))

document.getElementById("installSnap").addEventListener("click", (event) => installSnap())






const signatureWithBadGuy = { "from": "0xab3f74bf693cd9cf123a31838357625ce3e5c0d2", "data": { "types": { "Person": [{ "name": "name", "type": "string" }, { "name": "wallet", "type": "address" }], "Mail": [{ "name": "from", "type": "Person" }, { "name": "to", "type": "Person" }, { "name": "contents", "type": "string" }], "EIP712Domain": [{ "name": "name", "type": "string" }, { "name": "version", "type": "string" }, { "name": "chainId", "type": "uint256" }, { "name": "verifyingContract", "type": "address" }] }, "domain": { "name": "Ether Mail", "version": "1", "chainId": "0x1", "verifyingContract": "0xcccccccccccccccccccccccccccccccccccccccc" }, "primaryType": "Mail", "message": { "from": { "name": "Cow", "wallet": "0xcd2a3d9f938e13cd947ec05abc7fe734df8dd826" }, "to": { "name": "Bad guy", "wallet": "0x55456cbd1f11298b80a53c896f4b1dc9bc16c731" }, "contents": "Hi you seem like a bad guy :(" } }, "signatureMethod": "eth_signTypedData_v4" }
const openseaListingNormal = {
  "from": "0xab3f74bf693cd9cf123a31838357625ce3e5c0d2",
  "data": {
    "types": {
      "EIP712Domain": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "version",
          "type": "string"
        },
        {
          "name": "chainId",
          "type": "uint256"
        },
        {
          "name": "verifyingContract",
          "type": "address"
        }
      ],
      "OrderComponents": [
        {
          "name": "offerer",
          "type": "address"
        },
        {
          "name": "zone",
          "type": "address"
        },
        {
          "name": "offer",
          "type": "OfferItem[]"
        },
        {
          "name": "consideration",
          "type": "ConsiderationItem[]"
        },
        {
          "name": "orderType",
          "type": "uint8"
        },
        {
          "name": "startTime",
          "type": "uint256"
        },
        {
          "name": "endTime",
          "type": "uint256"
        },
        {
          "name": "zoneHash",
          "type": "bytes32"
        },
        {
          "name": "salt",
          "type": "uint256"
        },
        {
          "name": "conduitKey",
          "type": "bytes32"
        },
        {
          "name": "counter",
          "type": "uint256"
        }
      ],
      "OfferItem": [
        {
          "name": "itemType",
          "type": "uint8"
        },
        {
          "name": "token",
          "type": "address"
        },
        {
          "name": "identifierOrCriteria",
          "type": "uint256"
        },
        {
          "name": "startAmount",
          "type": "uint256"
        },
        {
          "name": "endAmount",
          "type": "uint256"
        }
      ],
      "ConsiderationItem": [
        {
          "name": "itemType",
          "type": "uint8"
        },
        {
          "name": "token",
          "type": "address"
        },
        {
          "name": "identifierOrCriteria",
          "type": "uint256"
        },
        {
          "name": "startAmount",
          "type": "uint256"
        },
        {
          "name": "endAmount",
          "type": "uint256"
        },
        {
          "name": "recipient",
          "type": "address"
        }
      ]
    },
    "primaryType": "OrderComponents",
    "domain": {
      "name": "Seaport",
      "version": "1.5",
      "chainId": "1",
      "verifyingContract": "0x00000000000000ADc04C56Bf30aC9d3c0aAF14dC"
    },
    "message": {
      "offerer": "0xAB3f74BF693Cd9cF123A31838357625ce3e5c0d2",
      "offer": [
        {
          "itemType": "2",
          "token": "0x3Fc3a022EB15352D3f5E4e6D6f02BBfC57D9C159",
          "identifierOrCriteria": "102",
          "startAmount": "1",
          "endAmount": "1"
        }
      ],
      "consideration": [
        {
          "itemType": "0",
          "token": "0x0000000000000000000000000000000000000000",
          "identifierOrCriteria": "0",
          "startAmount": "400000000000000000",
          "endAmount": "400000000000000000",
          "recipient": "0xAB3f74BF693Cd9cF123A31838357625ce3e5c0d2"
        },
        {
          "itemType": "0",
          "token": "0x0000000000000000000000000000000000000000",
          "identifierOrCriteria": "0",
          "startAmount": "10000000000000000",
          "endAmount": "10000000000000000",
          "recipient": "0x0000a26b00c1F0DF003000390027140000fAa719"
        },
        {
          "itemType": "0",
          "token": "0x0000000000000000000000000000000000000000",
          "identifierOrCriteria": "0",
          "startAmount": "500000000000000000",
          "endAmount": "500000000000000000",
          "recipient": "0xA2695BC9E0e42f7eEac8C80D2E855D9AF9e9667B"
        }
      ],
      "startTime": "1709314672",
      "endTime": "1709315738",
      "orderType": "0",
      "zone": "0x004C00500000aD104D7DBd00e3ae0A5C00560C00",
      "zoneHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
      "salt": "24446860302761739304752683030156737591518664810215442929805784398191534575053",
      "conduitKey": "0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000",
      "totalOriginalConsiderationItems": "3",
      "counter": "0"
    }
  },
  "signatureMethod": "eth_signTypedData_v4"
}

const openseaListingVeryLowPrice = {
  "from": "0xab3f74bf693cd9cf123a31838357625ce3e5c0d2",
  "data": {
    "types": {
      "EIP712Domain": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "version",
          "type": "string"
        },
        {
          "name": "chainId",
          "type": "uint256"
        },
        {
          "name": "verifyingContract",
          "type": "address"
        }
      ],
      "OrderComponents": [
        {
          "name": "offerer",
          "type": "address"
        },
        {
          "name": "zone",
          "type": "address"
        },
        {
          "name": "offer",
          "type": "OfferItem[]"
        },
        {
          "name": "consideration",
          "type": "ConsiderationItem[]"
        },
        {
          "name": "orderType",
          "type": "uint8"
        },
        {
          "name": "startTime",
          "type": "uint256"
        },
        {
          "name": "endTime",
          "type": "uint256"
        },
        {
          "name": "zoneHash",
          "type": "bytes32"
        },
        {
          "name": "salt",
          "type": "uint256"
        },
        {
          "name": "conduitKey",
          "type": "bytes32"
        },
        {
          "name": "counter",
          "type": "uint256"
        }
      ],
      "OfferItem": [
        {
          "name": "itemType",
          "type": "uint8"
        },
        {
          "name": "token",
          "type": "address"
        },
        {
          "name": "identifierOrCriteria",
          "type": "uint256"
        },
        {
          "name": "startAmount",
          "type": "uint256"
        },
        {
          "name": "endAmount",
          "type": "uint256"
        }
      ],
      "ConsiderationItem": [
        {
          "name": "itemType",
          "type": "uint8"
        },
        {
          "name": "token",
          "type": "address"
        },
        {
          "name": "identifierOrCriteria",
          "type": "uint256"
        },
        {
          "name": "startAmount",
          "type": "uint256"
        },
        {
          "name": "endAmount",
          "type": "uint256"
        },
        {
          "name": "recipient",
          "type": "address"
        }
      ]
    },
    "primaryType": "OrderComponents",
    "domain": {
      "name": "Seaport",
      "version": "1.5",
      "chainId": "1",
      "verifyingContract": "0x00000000000000ADc04C56Bf30aC9d3c0aAF14dC"
    },
    "message": {
      "offerer": "0xAB3f74BF693Cd9cF123A31838357625ce3e5c0d2",
      "offer": [
        {
          "itemType": "2",
          "token": "0x3Fc3a022EB15352D3f5E4e6D6f02BBfC57D9C159",
          "identifierOrCriteria": "102",
          "startAmount": "1",
          "endAmount": "1"
        }
      ],
      "consideration": [
        {
          "itemType": "0",
          "token": "0x0000000000000000000000000000000000000000",
          "identifierOrCriteria": "0",
          "startAmount": "1000000000000",
          "endAmount": "1000000000000",
          "recipient": "0xAB3f74BF693Cd9cF123A31838357625ce3e5c0d2"
        },
        {
          "itemType": "0",
          "token": "0x0000000000000000000000000000000000000000",
          "identifierOrCriteria": "0",
          "startAmount": "1000000000000",
          "endAmount": "1000000000000",
          "recipient": "0x0000a26b00c1F0DF003000390027140000fAa719"
        },
        {
          "itemType": "0",
          "token": "0x0000000000000000000000000000000000000000",
          "identifierOrCriteria": "0",
          "startAmount": "1000000000000",
          "endAmount": "1000000000000",
          "recipient": "0xA2695BC9E0e42f7eEac8C80D2E855D9AF9e9667B"
        }
      ],
      "startTime": "1709314672",
      "endTime": "1709315738",
      "orderType": "0",
      "zone": "0x004C00500000aD104D7DBd00e3ae0A5C00560C00",
      "zoneHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
      "salt": "24446860302761739304752683030156737591518664810215442929805784398191534575053",
      "conduitKey": "0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000",
      "totalOriginalConsiderationItems": "3",
      "counter": "0"
    }
  },
  "signatureMethod": "eth_signTypedData_v4"
}

const openseaListingLowPrice = {
  "from": "0xab3f74bf693cd9cf123a31838357625ce3e5c0d2",
  "data": {
    "types": {
      "EIP712Domain": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "version",
          "type": "string"
        },
        {
          "name": "chainId",
          "type": "uint256"
        },
        {
          "name": "verifyingContract",
          "type": "address"
        }
      ],
      "OrderComponents": [
        {
          "name": "offerer",
          "type": "address"
        },
        {
          "name": "zone",
          "type": "address"
        },
        {
          "name": "offer",
          "type": "OfferItem[]"
        },
        {
          "name": "consideration",
          "type": "ConsiderationItem[]"
        },
        {
          "name": "orderType",
          "type": "uint8"
        },
        {
          "name": "startTime",
          "type": "uint256"
        },
        {
          "name": "endTime",
          "type": "uint256"
        },
        {
          "name": "zoneHash",
          "type": "bytes32"
        },
        {
          "name": "salt",
          "type": "uint256"
        },
        {
          "name": "conduitKey",
          "type": "bytes32"
        },
        {
          "name": "counter",
          "type": "uint256"
        }
      ],
      "OfferItem": [
        {
          "name": "itemType",
          "type": "uint8"
        },
        {
          "name": "token",
          "type": "address"
        },
        {
          "name": "identifierOrCriteria",
          "type": "uint256"
        },
        {
          "name": "startAmount",
          "type": "uint256"
        },
        {
          "name": "endAmount",
          "type": "uint256"
        }
      ],
      "ConsiderationItem": [
        {
          "name": "itemType",
          "type": "uint8"
        },
        {
          "name": "token",
          "type": "address"
        },
        {
          "name": "identifierOrCriteria",
          "type": "uint256"
        },
        {
          "name": "startAmount",
          "type": "uint256"
        },
        {
          "name": "endAmount",
          "type": "uint256"
        },
        {
          "name": "recipient",
          "type": "address"
        }
      ]
    },
    "primaryType": "OrderComponents",
    "domain": {
      "name": "Seaport",
      "version": "1.5",
      "chainId": "1",
      "verifyingContract": "0x00000000000000ADc04C56Bf30aC9d3c0aAF14dC"
    },
    "message": {
      "offerer": "0xAB3f74BF693Cd9cF123A31838357625ce3e5c0d2",
      "offer": [
        {
          "itemType": "2",
          "token": "0x3Fc3a022EB15352D3f5E4e6D6f02BBfC57D9C159",
          "identifierOrCriteria": "102",
          "startAmount": "1",
          "endAmount": "1"
        }
      ],
      "consideration": [
        {
          "itemType": "0",
          "token": "0x0000000000000000000000000000000000000000",
          "identifierOrCriteria": "0",
          "startAmount": "4000000000000000",
          "endAmount": "4000000000000000",
          "recipient": "0xAB3f74BF693Cd9cF123A31838357625ce3e5c0d2"
        },
        {
          "itemType": "0",
          "token": "0x0000000000000000000000000000000000000000",
          "identifierOrCriteria": "0",
          "startAmount": "100000000000000",
          "endAmount": "100000000000000",
          "recipient": "0x0000a26b00c1F0DF003000390027140000fAa719"
        },
        {
          "itemType": "0",
          "token": "0x0000000000000000000000000000000000000000",
          "identifierOrCriteria": "0",
          "startAmount": "5000000000000000",
          "endAmount": "5000000000000000",
          "recipient": "0xA2695BC9E0e42f7eEac8C80D2E855D9AF9e9667B"
        }
      ],
      "startTime": "1709314672",
      "endTime": "1709315738",
      "orderType": "0",
      "zone": "0x004C00500000aD104D7DBd00e3ae0A5C00560C00",
      "zoneHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
      "salt": "24446860302761739304752683030156737591518664810215442929805784398191534575053",
      "conduitKey": "0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000",
      "totalOriginalConsiderationItems": "3",
      "counter": "0"
    }
  },
  "signatureMethod": "eth_signTypedData_v4"
}

const openseaListingZeroPrice = {
  "from": "0xab3f74bf693cd9cf123a31838357625ce3e5c0d2",
  "data": {
    "types": {
      "EIP712Domain": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "version",
          "type": "string"
        },
        {
          "name": "chainId",
          "type": "uint256"
        },
        {
          "name": "verifyingContract",
          "type": "address"
        }
      ],
      "OrderComponents": [
        {
          "name": "offerer",
          "type": "address"
        },
        {
          "name": "zone",
          "type": "address"
        },
        {
          "name": "offer",
          "type": "OfferItem[]"
        },
        {
          "name": "consideration",
          "type": "ConsiderationItem[]"
        },
        {
          "name": "orderType",
          "type": "uint8"
        },
        {
          "name": "startTime",
          "type": "uint256"
        },
        {
          "name": "endTime",
          "type": "uint256"
        },
        {
          "name": "zoneHash",
          "type": "bytes32"
        },
        {
          "name": "salt",
          "type": "uint256"
        },
        {
          "name": "conduitKey",
          "type": "bytes32"
        },
        {
          "name": "counter",
          "type": "uint256"
        }
      ],
      "OfferItem": [
        {
          "name": "itemType",
          "type": "uint8"
        },
        {
          "name": "token",
          "type": "address"
        },
        {
          "name": "identifierOrCriteria",
          "type": "uint256"
        },
        {
          "name": "startAmount",
          "type": "uint256"
        },
        {
          "name": "endAmount",
          "type": "uint256"
        }
      ],
      "ConsiderationItem": [
        {
          "name": "itemType",
          "type": "uint8"
        },
        {
          "name": "token",
          "type": "address"
        },
        {
          "name": "identifierOrCriteria",
          "type": "uint256"
        },
        {
          "name": "startAmount",
          "type": "uint256"
        },
        {
          "name": "endAmount",
          "type": "uint256"
        },
        {
          "name": "recipient",
          "type": "address"
        }
      ]
    },
    "primaryType": "OrderComponents",
    "domain": {
      "name": "Seaport",
      "version": "1.5",
      "chainId": "1",
      "verifyingContract": "0x00000000000000ADc04C56Bf30aC9d3c0aAF14dC"
    },
    "message": {
      "offerer": "0xAB3f74BF693Cd9cF123A31838357625ce3e5c0d2",
      "offer": [
        {
          "itemType": "2",
          "token": "0x3Fc3a022EB15352D3f5E4e6D6f02BBfC57D9C159",
          "identifierOrCriteria": "102",
          "startAmount": "1",
          "endAmount": "1"
        }
      ],
      "consideration": [
        {
          "itemType": "0",
          "token": "0x0000000000000000000000000000000000000000",
          "identifierOrCriteria": "0",
          "startAmount": "0",
          "endAmount": "0",
          "recipient": "0xAB3f74BF693Cd9cF123A31838357625ce3e5c0d2"
        },
        {
          "itemType": "0",
          "token": "0x0000000000000000000000000000000000000000",
          "identifierOrCriteria": "0",
          "startAmount": "0",
          "endAmount": "0",
          "recipient": "0x0000a26b00c1F0DF003000390027140000fAa719"
        },
        {
          "itemType": "0",
          "token": "0x0000000000000000000000000000000000000000",
          "identifierOrCriteria": "0",
          "startAmount": "0",
          "endAmount": "0",
          "recipient": "0xA2695BC9E0e42f7eEac8C80D2E855D9AF9e9667B"
        }
      ],
      "startTime": "1709314672",
      "endTime": "1709315738",
      "orderType": "0",
      "zone": "0x004C00500000aD104D7DBd00e3ae0A5C00560C00",
      "zoneHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
      "salt": "24446860302761739304752683030156737591518664810215442929805784398191534575053",
      "conduitKey": "0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000",
      "totalOriginalConsiderationItems": "3",
      "counter": "0"
    }
  },
  "signatureMethod": "eth_signTypedData_v4"
}


const sendEthToNormalAddress = {
  value: ethers.parseEther("0.0001").toString(16),
  data: "0x00",
  gasLimit: '0x5208',
  maxFeePerGas: '0x5208',
  maxPriorityFeePerGas: '0x5208',
  nonce: '0x00',
  to: '0x23bc95F84BD43C1FCc2bc285fDa4Cb12f9AEE2df'.toLowerCase(),
  from: '0x78f747ce0684f6d8b002ddc5649074bf59d05cb6'.toLowerCase()
}

const sendEthToMaliciousAddress = {
  value: ethers.parseEther("0.0001").toString(16),
  data: "0x00",
  gasLimit: '0x5208',
  maxFeePerGas: '0x5208',
  maxPriorityFeePerGas: '0x5208',
  nonce: '0x00',
  to: '0x09750ad360fdb7a2ee23669c4503c974d86d8694'.toLowerCase(),
  from: '0x78f747ce0684f6d8b002ddc5649074bf59d05cb6'.toLowerCase()
}



const normalUniswapSwap = {
  value: "0x" + ethers.parseEther("0.001").toString(16),
  data: "0x3593564c000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000065e39eb300000000000000000000000000000000000000000000000000000000000000040b000604000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000028000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000009184e72a00000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000009184e72a0000000000000000000000000000000000000000000000000000073e21249f1d72500000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002bc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2000bb86b175474e89094c44da98b954eedeac495271d0f00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000006b175474e89094c44da98b954eedeac495271d0f00000000000000000000000037a8f295612602f2774d331e562be9e61b83a327000000000000000000000000000000000000000000000000000000000000000f00000000000000000000000000000000000000000000000000000000000000600000000000000000000000006b175474e89094c44da98b954eedeac495271d0f00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000073e21249f1d725",
  gasLimit: '0x5208',
  maxFeePerGas: '0x5208',
  maxPriorityFeePerGas: '0x5208',
  nonce: '0x00',
  to: '0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD'.toLowerCase(),
  from: '0x78f747ce0684f6d8b002ddc5649074bf59d05cb6'.toLowerCase()
}



