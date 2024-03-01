import { ethers } from "ethers"

//---------------------
//uniswap tx
export const uniswapTx: any = {
    value: "0x" + ethers.parseEther("0.001").toString(16),
    data:  "0x3593564c000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000065dce95800000000000000000000000000000000000000000000000000000000000000020b000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000038d7ea4c680000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000038d7ea4c680000000000000000000000000000000000000000000000000000001bb551367d00500000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002bfff9976782d46cc05630d1f6ebab18b2324d6b140001f41f9840a85d5af5bf1d1762f925bdaddc4201f984000000000000000000000000000000000000000000"
    ,
    gasLimit: '0x5208',
    maxFeePerGas: '0x5208',
    maxPriorityFeePerGas: '0x5208',
    nonce: '0x00',
    to: '0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD'.toLowerCase(),
    from: '0x78f747ce0684f6d8b002ddc5649074bf59d05cb6'.toLowerCase()
}

export const tornadoCashTx: any = {
    value: "0x" + ethers.parseEther("0.1").toString(16),
    data:  "0x13d98d1300000000000000000000000012d66f87a04a9e220743712ce6d9bb1b5616b8fc040822ae639f747234d80428af86836eed31735c70b89f56419e6338d728860900000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000000"
    ,
    gasLimit: '0x5208',
    maxFeePerGas: '0x5208',
    maxPriorityFeePerGas: '0x5208',
    nonce: '0x00',
    to: '0xd90e2f925DA726b50C4Ed8D0Fb90Ad053324F31b'.toLowerCase(),
    from: '0x78f747ce0684f6d8b002ddc5649074bf59d05cb6'.toLowerCase()
}

export const scamTx: any = {
    value: "0x" + ethers.parseEther("0.1").toString(16),
    data: "0x00",
    gasLimit: '0x5208',
    maxFeePerGas: '0x5208',
    maxPriorityFeePerGas: '0x5208',
    nonce: '0x00',
    to: '0x09750ad360fdb7a2ee23669c4503c974d86d8694'.toLowerCase(),
    from: '0x78f747ce0684f6d8b002ddc5649074bf59d05cb6'.toLowerCase()
}

export const normalEthTx: any = {
    value: "0x" + ethers.parseEther("0.1").toString(16),
    data: "0x00",
    gasLimit: '0x5208',
    maxFeePerGas: '0x5208',
    maxPriorityFeePerGas: '0x5208',
    nonce: '0x00',
    to: '0x8c3b6B718a23A4ba76630274b53E7aaEdC7319Fa'.toLowerCase(),
    from: '0x78f747ce0684f6d8b002ddc5649074bf59d05cb6'.toLowerCase()
}

export const normalEthEnsTx: any = {
    value: "0x" + ethers.parseEther("0.1").toString(16),
    data: "0x00",
    gasLimit: '0x5208',
    maxFeePerGas: '0x5208',
    maxPriorityFeePerGas: '0x5208',
    nonce: '0x00',
    to: '0x23bc95F84BD43C1FCc2bc285fDa4Cb12f9AEE2df'.toLowerCase(),
    from: '0x78f747ce0684f6d8b002ddc5649074bf59d05cb6'.toLowerCase()
}