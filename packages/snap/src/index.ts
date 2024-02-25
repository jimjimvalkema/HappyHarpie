import { OnTransactionHandler } from '@metamask/snaps-types';
import { heading, panel, text } from '@metamask/snaps-ui';
const harpieApiKey = "d8832f15-e9e5-489c-9087-bea84a79258a"

async function getContractName(address: String) {
  const harpieFetchResult = await fetch("https://api.harpie.io/v2/getcontractname", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      apiKey: harpieApiKey,
      address: address
    })
  })
  return (await harpieFetchResult.json())["contractOwner"]
}

async function getTransactionInformation(transaction: any) {
  let txData
  if (transaction.data) {
    txData = transaction.data
  } else {
    txData = "0x0"
  }

  const harpieFetchResult = await fetch("https://api.harpie.io/v2/validateTransaction", {

    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: String(JSON.stringify({
      apiKey: harpieApiKey,
      to: transaction.to,
      value: transaction.value,
      from: transaction.from,
      data: txData
    }))
  })
  return await harpieFetchResult.json()
}

// Handle outgoing transactions.
export const onTransaction: OnTransactionHandler = async ({ transaction }) => {
  const harpieTransactionInformation = await getTransactionInformation(transaction)
  const contractName = await getContractName(String(transaction.to))



  // Display percentage of gas fees in the transaction insights UI.
  return {
    content: panel([
      heading(String(harpieTransactionInformation['summary'])),
      text(`Sending transaction to ${contractName}`),
      text(String(JSON.stringify(harpieTransactionInformation))),
    ]),
  };
};