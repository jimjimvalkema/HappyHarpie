import { installSnap } from '@metamask/snaps-jest';
import { panel, text, heading } from '@metamask/snaps-sdk';
import {harpieFunctions} from "./harpieFunctions"
import { SourcifyFunctions } from './sourcifyFunctions';
import { normalEthTx,normalEthEnsTx,scamTx,uniswapTx } from '../tests/testTransactions';

const testTxs = [normalEthTx,normalEthEnsTx,scamTx,uniswapTx]
for (const transaction of testTxs) {
  describe('happyHarpie', () => {
    it('should return insight of a normal eth transfer to the 3pool contract', async () => {
      //mimics the install snap flow
      //https://docs.metamask.io/snaps/reference/jest/#installsnap
      const { onTransaction } = await installSnap(/* optional Snap ID */);
      
      //simulates user going to the confirm transaction page with out transaction
      //https://docs.metamask.io/snaps/reference/jest/#ontransaction
      const response = await onTransaction(transaction);
  
      //get info
  
      const harpieTransactionInformation = await harpieFunctions.createInformationMessage(transaction)
      
      let harpieContractYesNo = await harpieFunctions.isContract(transaction["to"]);
      let sourcifyTxInfo:string = "You are not interacting with a smart contract";
  
      if (harpieContractYesNo === true) {
        sourcifyTxInfo = await SourcifyFunctions.evaluation(transaction.to);
      }
  
      console.log(`tx info: ${JSON.stringify(harpieTransactionInformation,null,2)}`)
      console.log(`sourcify info: ${sourcifyTxInfo}`)
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

}