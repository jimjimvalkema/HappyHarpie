import { harpieFunctions } from "./harpieFunctions"
import { ethers } from "ethers"

export async function main() {

    // //const harpieTransactionInformation = await harpieFunctions.getTransactionInformation(transaction)
    // const contractName3pool = await harpieFunctions.getAddressName(String("0x6c3f90f043a72fa612cbac8115ee7e52bde6e490"))
    // //should be 3pool
    // console.log(contractName3pool)

    // const contractNameUniswapRouter = await harpieFunctions.getAddressName(String("0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD"))
    // //Universal Router
    // console.log(contractNameUniswapRouter)

    //---------------------
    //uniswap tx
    // const uniswapTxData = "0x3593564c000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000065dce95800000000000000000000000000000000000000000000000000000000000000020b000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000038d7ea4c680000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000038d7ea4c680000000000000000000000000000000000000000000000000000001bb551367d00500000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002bfff9976782d46cc05630d1f6ebab18b2324d6b140001f41f9840a85d5af5bf1d1762f925bdaddc4201f984000000000000000000000000000000000000000000"
    // const ethAmount  =  "0x" + ethers.parseEther("0.001").toString(16)
    // const uniswapTx: any = {
    //     value: ethAmount,
    //     data: uniswapTxData,
    //     gasLimit: '0x5208',
    //     maxFeePerGas: '0x5208',
    //     maxPriorityFeePerGas: '0x5208',
    //     nonce: '0x00',
    //     to: '0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD',
    //     from: '0x78f747ce0684f6d8b002ddc5649074bf59d05cb6'
    // }
    // const transactionInfo = await harpieFunctions.getTransactionInformation(uniswapTx)
    // console.log(transactionInfo)

    // console.log(harpieFunctions.createInformationMessage(transactionInfo))

    //---------------------
    //tornadocash tx
    // const tornadoCashDepositTxData = "0x13d98d1300000000000000000000000012d66f87a04a9e220743712ce6d9bb1b5616b8fc040822ae639f747234d80428af86836eed31735c70b89f56419e6338d728860900000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000000"
    // const tornadoCashDepositEthAmount =  "0x" + ethers.parseEther("0.1").toString(16)
    // const tornadoCashTx: any = {
    //     value: tornadoCashDepositEthAmount,
    //     data: tornadoCashDepositTxData,
    //     gasLimit: '0x5208',
    //     maxFeePerGas: '0x5208',
    //     maxPriorityFeePerGas: '0x5208',
    //     nonce: '0x00',
    //     to: '0xd90e2f925DA726b50C4Ed8D0Fb90Ad053324F31b',
    //     from: '0x78f747ce0684f6d8b002ddc5649074bf59d05cb6'
    // }

    // const tornadoCashtransactionInfo = await harpieFunctions.getTransactionInformation(tornadoCashTx)
    // console.log(tornadoCashtransactionInfo)

    // console.log(harpieFunctions.createInformationMessage(tornadoCashtransactionInfo))

    //send eth to xrp scammer
    //const tornadoCashDepositTxData = "0x13d98d1300000000000000000000000012d66f87a04a9e220743712ce6d9bb1b5616b8fc040822ae639f747234d80428af86836eed31735c70b89f56419e6338d728860900000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000000"
    const scamTx: any = {
        value: "0x" + ethers.parseEther("0.1").toString(16),
        data: "0x00",
        gasLimit: '0x5208',
        maxFeePerGas: '0x5208',
        maxPriorityFeePerGas: '0x5208',
        nonce: '0x00',
        to: '0x09750ad360fdb7a2ee23669c4503c974d86d8694',
        from: '0x78f747ce0684f6d8b002ddc5649074bf59d05cb6'
    }

    console.log(await harpieFunctions.createInformationMessage(scamTx))

}  

main()