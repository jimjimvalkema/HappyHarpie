import { signatureChecker } from "../src/signatureChecker"

export async function main() {
    const signature: any = { "from": "0x8c3b6b718a23a4ba76630274b53e7aaedc7319fa", "data": { "types": { "message": [{ "name": "valueA", "type": "string" }, { "name": "valueB", "type": "address" }], "EIP712Domain": [{ "name": "name", "type": "string" }, { "name": "version", "type": "string" }, { "name": "chainId", "type": "uint256" }, { "name": "verifyingContract", "type": "address" }] }, "domain": { "name": "Ether Mail", "version": "1", "chainId": "0x1", "verifyingContract": "0xcccccccccccccccccccccccccccccccccccccccc" }, "primaryType": "message", "message": { "valueA": "hiiii", "valueB": "0x55456cbd1f11298b80a53c896f4b1dc9bc16c731" } }, "signatureMethod": "eth_signTypedData_v4" }

    const maxAmountTimeout = new Promise(resolve => setTimeout(resolve, 100000));
    let maliciousAddresses = signatureChecker.checkEIP712(signature)
    maliciousAddresses =await  Promise.race([maliciousAddresses, maxAmountTimeout])
    if(maliciousAddresses) {
        console.log(maliciousAddresses)   
    } else {
        console.log("took too long :(")
    }

    
}  

main()