import { OnTransactionHandler , SeverityLevel} from '@metamask/snaps-types';
import {OnSignatureHandler}  from '@metamask/snaps-sdk';
import { heading, panel, text } from '@metamask/snaps-ui';
import {harpieFunctions} from "./harpieFunctions"
import { SourcifyFunctions } from './sourcifyFunctions';
import { signatureChecker } from './signatureChecker';

// snap api handlers
//onTransaction function is exported in the snap and used by metamask.
//metamask then calls onTransaction everytime the use is at the confirm tx page
//the function needs to called onTransaction otherwise metamask doesnt see it
// //https://docs.metamask.io/snaps/reference/entry-points/#ontransaction
export const onTransaction: OnTransactionHandler = async ({ transaction }) => {
  console.log("the tx:",transaction)

  //get the infornmation from harpie about the tx
  const harpieTransactionInformation = await harpieFunctions.createInformationMessage(transaction)
  console.log(`tx info from harpie: ${String(JSON.stringify(harpieTransactionInformation))}`)

  // need to check if interaction is w a contract not an EOA, if so run this, if not skip
  let harpieContractYesNo = await harpieFunctions.isContract(transaction["to"]);
  let sourcifyTxInfo:string = "You are not interacting with a smart contract.";

  if (harpieContractYesNo === true) {
    sourcifyTxInfo = await SourcifyFunctions.evaluation(transaction.to);
  }

  //displays the info gathered
  //panel, heading and text are from metasmask snap api:
  //https://docs.metamask.io/snaps/features/custom-ui/
  return {
    content: panel([
      heading(harpieTransactionInformation.header),
      text(harpieTransactionInformation.body),
      text(sourcifyTxInfo),
    ]),
  };
};

export const onSignature: OnSignatureHandler = async ({
  signature,
  signatureOrigin,
}) => {
  //TODO check signature origin
  //TODO research recursive data types
  const maliciousAddresses = await signatureChecker.checkEIP712Addresses(signature)
  const isOpenSeaListing =  signatureChecker.isOpenseaSignature(signature)
  let differenceFromFloor = 0
  let listingPrice
  let floorPrice
  if (isOpenSeaListing) {
    const signatureAny:any = signature
    const nftContractAddress = signatureAny.data.message.offer[0].token
    floorPrice = await signatureChecker.getFloorPrice(nftContractAddress)
    listingPrice = signatureChecker.getListingPriceOpenSea(signatureAny)
    differenceFromFloor = await signatureChecker.getPercentageDifferenceFromFloor(listingPrice, floorPrice)

  }
  if (maliciousAddresses.length>0) {
    return {
      content: panel([
        heading(`❗One or more addresses has been labeled MALICIOUS❗`),
        //TODO get tags from harpie
        text(`DO NOT sign this signature.\n The following address(es) have been blacklisted by harpie ${maliciousAddresses.toString()}`),
      ]),
      severity: SeverityLevel.Critical //severity: severityLevel
    };

  } else if (differenceFromFloor < -10) {
    const {headingContent,  textContent } = await signatureChecker.getFloorDifferenceMessage(signature, differenceFromFloor,listingPrice,floorPrice)
    console.log(headingContent, textContent)
    return {
      content: panel([
        heading(headingContent),
        text(textContent),
      ]),
      severity: SeverityLevel.Critical //severity: severityLevel
    };

  }else {
    return {
      content: panel([]),
    };
  }




  //const insights:any = [{"value": JSON.stringify(maliciousAddresses)}]//, {"value":signature}, {"value":signatureOrigin}]/* Get insights based on custom logic */;

};