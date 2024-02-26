import { OnTransactionHandler } from '@metamask/snaps-types';
import { heading, panel, text } from '@metamask/snaps-ui';
import {harpieFunctions} from "./harpieFunctions"


// snap api handlers
export const onTransaction: OnTransactionHandler = async ({ transaction }) => {

  const harpieTransactionInformation = await harpieFunctions.getTransactionInformation(transaction)
  const contractName = await harpieFunctions.getAddressName(String(transaction.to))

  console.log(transaction)
  //displays the info gathered
  return {
    content: panel([
      heading(String(harpieTransactionInformation['summary'])),
      text(`Sending transaction to ${contractName}`),
      text(String(JSON.stringify(harpieTransactionInformation))),
    ]),
  };
};