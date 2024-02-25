import { OnTransactionHandler } from '@metamask/snaps-types';
import { heading, panel, text } from '@metamask/snaps-ui';

// Handle outgoing transactions.
export const onTransaction: OnTransactionHandler = async ({ transaction }) => {
  let txData 
  if (transaction.data) {
    txData=transaction.data
  } else {
    txData = "0x0"
  }

  const harpieFetch = await fetch("https://api.harpie.io/v2/validateTransaction", {

    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: String(JSON.stringify({
      apiKey: "d8832f15-e9e5-489c-9087-bea84a79258a",
      to: transaction.to,
      value: transaction.value,
      from: transaction.from,
      data: txData
    }))
  })
  const harpieResult = await harpieFetch.json()

  // Display percentage of gas fees in the transaction insights UI.
  return {
    content: panel([
      heading(String(harpieResult['summary'])), 
      text(String(JSON.stringify(harpieResult))),
    ]),
  };
};