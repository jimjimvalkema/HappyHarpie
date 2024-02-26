import { installSnap } from '@metamask/snaps-jest';
import { panel, text, heading } from '@metamask/snaps-sdk';
import {harpieFunctions} from "./harpieFunctions"
import { ethers } from 'ethers';

describe('MySnap', () => {
  it('should return insights', async () => {
    const { onTransaction } = await installSnap(/* optional Snap ID */);
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
    
    const response = await onTransaction(transaction);

    const harpieTransactionInformation = await harpieFunctions.getTransactionInformation(transaction)
    const contractName = await harpieFunctions.getAddressName(String(transaction.to))
    
    //displays the info gathered
    expect(response).toRender(
      panel([
        heading(String(harpieTransactionInformation['summary'])),
        text(`Sending transaction to ${contractName}`),
        text(String(JSON.stringify(harpieTransactionInformation))),
      ]),
      );
  });
});