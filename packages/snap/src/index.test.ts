import { installSnap } from '@metamask/snaps-jest';
import { panel, text, heading } from '@metamask/snaps-sdk';
import {harpieFunctions} from "./harpieFunctions"
import { SourcifyFunctions } from './sourcifyFunctions';


describe('happyHarpie', () => {
  it('should return insight of a normal eth transfer to the 3pool contract', async () => {
    //mimics the install snap flow
    //https://docs.metamask.io/snaps/reference/jest/#installsnap
    const { onTransaction } = await installSnap(/* optional Snap ID */);

    //a normal eth transfer to the 3pool contract
    const transaction : any = {
      value: '0x00',
      data: '0x00',
      gasLimit: '0x5208',
      maxFeePerGas: '0x5208',
      maxPriorityFeePerGas: '0x5208',
      nonce: '0x00',
      to: '0x6c3f90f043a72fa612cbac8115ee7e52bde6e490',
      from: '0x78f747ce0684f6d8b002ddc5649074bf59d05cb6'
    }
    
    //simulates user going to the confirm transaction page with out transaction
    //https://docs.metamask.io/snaps/reference/jest/#ontransaction
    const response = await onTransaction(transaction);

    //get info

    const harpieTransactionInformation = await harpieFunctions.createInformationMessage(transaction)
    
    let harpieContractYesNo = await harpieFunctions.isContract(transaction["to"]);
    console.log("This is the bool from isContract: ", harpieContractYesNo);
    let sourcifyTxInfo:string = "You are not interacting with a smart contract";
    // console.log(typeof(sourcifyTxInfo), "This is STxIn", sourcifyTxInfo);

    if (harpieContractYesNo === true) {
      sourcifyTxInfo = await SourcifyFunctions.evaluation(transaction.to);
      // console.log(typeof(sourcifyTxInfo), "This is STxIn", sourcifyTxInfo);
    }

    //checks if the info rendered matches that with what onTransaction(transaction) made from simulating
    //this is from jest https://jestjs.io/docs/getting-started
    expect(response).toRender(
      panel([
        heading(harpieTransactionInformation.header),
        text(harpieTransactionInformation.body),
        text(sourcifyTxInfo)
      ]),
      );
  });
});