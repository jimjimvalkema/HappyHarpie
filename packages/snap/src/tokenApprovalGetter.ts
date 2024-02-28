
const userAddress = "0x23bc95F84BD43C1FCc2bc285fDa4Cb12f9AEE2df"
const covalantApi = "cqt_rQpPDd4CxJJm7mBqJWt6hKdggvPj:"
async function hi() {
    const result = await fetch(`https://api.covalenthq.com/v1/eth-mainnet/approvals/${userAddress}/`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(covalantApi)
        }
        });
        console.log(await result.json())
    
}
hi()