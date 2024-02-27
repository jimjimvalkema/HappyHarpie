import { OnTransactionHandler } from '@metamask/snaps-types';
import { heading, panel, text } from '@metamask/snaps-ui';
import {harpieFunctions} from "./harpieFunctions"
import { SourcifyFunctions } from './sourcifyFunctions';

// snap api handlers
//onTransaction function is exported in the snap and used by metamask.
//metamask then calls onTransaction everytime the use is at the confirm tx page
//the function needs to called onTransaction otherwise metamask doesnt see it
//https://docs.metamask.io/snaps/reference/entry-points/#ontransaction
export const onTransaction: OnTransactionHandler = async ({ transaction }) => {
  console.log(transaction)

  //get the infornmation from harpie about the tx
  const harpieTransactionInformation = await harpieFunctions.createInformationMessage(transaction)
  console.log(`tx info from harpie: ${String(JSON.stringify(harpieTransactionInformation))}`)
  const sourcifyTxInfo = await SourcifyFunctions.evaluation(transaction.to);

  //displays the info gathered
  //panel, heading and text are from metasmask snap api:
  //https://docs.metamask.io/snaps/features/custom-ui/
  return {
    content: panel([
      heading(harpieTransactionInformation.header),
      text(harpieTransactionInformation.body),
      heading(sourcifyTxInfo)
    ]),
  };
};
