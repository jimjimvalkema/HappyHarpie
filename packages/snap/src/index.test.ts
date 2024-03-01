import { installSnap } from '@metamask/snaps-jest';
import { panel, text, heading } from '@metamask/snaps-sdk';
import { signatureChecker } from './signatureChecker';
import { harpieFunctions } from "./harpieFunctions"
import { SourcifyFunctions } from './sourcifyFunctions';
import { normalEthTx, normalEthEnsTx, scamTx, uniswapTx } from '../tests/testTransactions';
import { SeverityLevel } from "@metamask/snaps-types"

describe('happyHarpie', () => {
  it('should return insight of a 712 signature', async () => {
    //mimics the install snap flow
    //https://docs.metamask.io/snaps/reference/jest/#installsnap
    const { onSignature } = await installSnap(/* optional Snap ID */);

    //simulates user going to the confirm transaction page with out transaction
    //https://docs.metamask.io/snaps/reference/jest/#ontransaction
    const signature: any = { "from": "0x8c3b6b718a23a4ba76630274b53e7aaedc7319fa", "data": { "types": { "message": [{ "name": "valueA", "type": "string" }, { "name": "valueB", "type": "address" }], "EIP712Domain": [{ "name": "name", "type": "string" }, { "name": "version", "type": "string" }, { "name": "chainId", "type": "uint256" }, { "name": "verifyingContract", "type": "address" }] }, "domain": { "name": "Ether Mail", "version": "1", "chainId": "0x1", "verifyingContract": "0xcccccccccccccccccccccccccccccccccccccccc" }, "primaryType": "message", "message": { "valueA": "hiiii", "valueB": "0x55456cbd1f11298b80a53c896f4b1dc9bc16c731" } }, "signatureMethod": "eth_signTypedData_v4" }
    const response = await onSignature(signature);

    const maliciousAddresses = await signatureChecker.checkEIP712(signature)
    if (maliciousAddresses.length) {
      expect(response).toRender(
        panel([
          heading(`❗One or more addresses has been labeled MALICIOUS❗`),
          text(`DO NOT sign this signature.\n The following address(es) have been blacklisted by harpie ${maliciousAddresses.toString()}`)
        ]),
      );

    } else {
      expect(response).toRender(
        panel([
        ]),
      )
    }
  })
})





const testTxs = [scamTx, normalEthEnsTx]//,normalEthTx, uniswapTx]
for (const transaction of testTxs) {
  describe('happyHarpie', () => {
    it('should return insight of the transaction', async () => {
      //mimics the install snap flow
      //https://docs.metamask.io/snaps/reference/jest/#installsnap
      const { onTransaction } = await installSnap(/* optional Snap ID */);

      //simulates user going to the confirm transaction page with out transaction
      //https://docs.metamask.io/snaps/reference/jest/#ontransaction
      const response = await onTransaction(transaction);

      //get info

      const harpieTransactionInformation = await harpieFunctions.createInformationMessage(transaction)

      let harpieContractYesNo = await harpieFunctions.isContract(transaction["to"]);
      let sourcifyTxInfo: string = "You are not interacting with a smart contract.";

      if (harpieContractYesNo === true) {
        sourcifyTxInfo = await SourcifyFunctions.evaluation(transaction.to);
      }

      console.log(`tx info: ${JSON.stringify(harpieTransactionInformation, null, 2)}`)
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